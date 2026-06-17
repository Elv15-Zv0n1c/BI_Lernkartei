import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Check, 
  Undo2, 
  Search, 
  Grid, 
  BookOpen, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { FLASHCARDS } from './data';
import { ViewMode } from './types';

// Storage Key with fallback for iframe blocks
const STORAGE_KEY = 'bi-lernkarten-known-v2';

export default function App() {
  // ------------ State ------------
  const [knownIds, setKnownIds] = useState<Set<number>>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      // Fallback for sandboxed previews with blocked/disabled localStorage
      console.warn('LocalStorage stands blocked or unavailable, using in-memory state.');
      return new Set();
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUnlearned, setOnlyUnlearned] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('card');
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Track order indices of active card list
  const [cardIndices, setCardIndices] = useState<number[]>([]);
  const [currentPos, setCurrentPos] = useState(0);

  // For visual transition triggers or key focuses
  const cardRef = useRef<HTMLDivElement>(null);

  // ------------ Persist Known Sets ------------
  const saveKnownSet = (newSet: Set<number>) => {
    setKnownIds(newSet);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
    } catch (e) {
      // In-memory fallback is automatic since state was updated
    }
  };

  // ------------ Alphabet list generation ------------
  const alphabetTabs = useMemo(() => {
    const letters = new Set<string>();
    FLASHCARDS.forEach(card => {
      const firstChar = card.term.trim()[0].toUpperCase();
      letters.add(/[A-ZÄÖÜ]/.test(firstChar) ? firstChar : '#');
    });
    return Array.from(letters).sort((a, b) => {
      if (a === '#') return -1;
      if (b === '#') return 1;
      return a.localeCompare(b);
    });
  }, []);

  const getLetterOfTerm = (term: string) => {
    const firstChar = term.trim()[0].toUpperCase();
    return /[A-ZÄÖÜ]/.test(firstChar) ? firstChar : '#';
  };

  // ------------ Index Filtering Engine ------------
  // When search or filter changes, we rebuild the linear order
  useEffect(() => {
    const filtered = FLASHCARDS.map((_, i) => i).filter(idx => {
      // Search match
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        FLASHCARDS[idx].term.toLowerCase().includes(q) || 
        FLASHCARDS[idx].definition.toLowerCase().includes(q);
      
      // Filter match
      const matchesUnlearned = !onlyUnlearned || !knownIds.has(idx);

      return matchesSearch && matchesUnlearned;
    });

    setCardIndices(filtered);
    setCurrentPos(0);
    setIsFlipped(false);
  }, [searchQuery, onlyUnlearned, knownIds.size, onlyUnlearned]);

  // ------------ Keyboard Controls for Cards ------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is writing in the search box
      if (document.activeElement?.id === 'search-input') return;
      if (currentView !== 'card' || cardIndices.length === 0) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleStep(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleStep(1);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardIndices, currentPos, currentView]);

  // ------------ Handlers ------------
  const handleStep = (delta: number) => {
    if (cardIndices.length <= 1) return;
    setIsFlipped(false);
    // Timeout to finish flip before changing content
    setTimeout(() => {
      setCurrentPos(prev => (prev + delta + cardIndices.length) % cardIndices.length);
    }, 150);
  };

  const jumpToLetter = (letter: string) => {
    // Clear search and show all when jumping to specific tab index
    setSearchQuery('');
    setOnlyUnlearned(false);
    
    // Find first term starting with this letter
    const originalIndex = FLASHCARDS.findIndex(c => getLetterOfTerm(c.term) === letter);
    if (originalIndex !== -1) {
      // Recast entire list (since we cleared filters)
      const allIndices = FLASHCARDS.map((_, i) => i);
      setCardIndices(allIndices);
      setCurrentPos(allIndices.indexOf(originalIndex));
      setIsFlipped(false);
      setCurrentView('card');
    }
  };

  const openInCardView = (originalIndex: number) => {
    setSearchQuery('');
    setOnlyUnlearned(false);

    const allIndices = FLASHCARDS.map((_, i) => i);
    setCardIndices(allIndices);
    setCurrentPos(allIndices.indexOf(originalIndex));
    setIsFlipped(false);
    setCurrentView('card');
  };

  const toggleKnownStatus = (index: number) => {
    const updated = new Set<number>(knownIds);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    saveKnownSet(updated);
  };

  const handleShuffle = () => {
    if (cardIndices.length === 0) return;
    const shuffled = [...cardIndices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCardIndices(shuffled);
    setCurrentPos(0);
    setIsFlipped(false);
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Fortschritt wirklich zurücksetzen? Alle „Gewusst“-Markierungen gehen verloren.')) {
      saveKnownSet(new Set());
      setSearchQuery('');
      setOnlyUnlearned(false);
      const allIndices = FLASHCARDS.map((_, i) => i);
      setCardIndices(allIndices);
      setCurrentPos(0);
      setIsFlipped(false);
    }
  };

  // Computations
  const progressPercent = FLASHCARDS.length > 0 
    ? Math.round((knownIds.size / FLASHCARDS.length) * 100) 
    : 0;

  const currentFlashcard = cardIndices.length > 0 && currentPos < cardIndices.length 
    ? { info: FLASHCARDS[cardIndices[currentPos]], originalIdx: cardIndices[currentPos] } 
    : null;

  const currentLetter = currentFlashcard 
    ? getLetterOfTerm(currentFlashcard.info.term) 
    : '';

  return (
    <div className="min-h-screen bg-wall bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12),_transparent_60%)] text-ink font-serif px-4 py-8 pb-16 selection:bg-stamp selection:text-kraft">
      
      <div className="max-w-[760px] mx-auto">
        
        {/* --- Header / Masthead --- */}
        <header className="text-center mb-8">
          <div className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-ink-soft inline-flex items-center gap-1.5 justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-stamp" />
            BI · Prüfungsvorbereitung
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mt-1.5 mb-2 text-ink">
            Glossar-Karteikasten
          </h1>
          <p className="text-sm md:text-base text-ink-soft max-w-xl mx-auto leading-relaxed">
            Fachbegriffe aus dem Business-Intelligence-Fragenkatalog — zum Durchblättern, Mischen und Abfragen.
          </p>
          <div className="font-mono text-[0.68rem] tracking-wide text-ink-soft/80 mt-2.5 hidden md:block">
            Tippen oder Leertaste zum Umdrehen · ←/→ zum Blättern · Reiter zum Springen
          </div>
        </header>

        {/* --- Toolbar: Search + View toggle --- */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c8f72]" />
            <input 
              id="search-input"
              type="search" 
              placeholder="Begriff oder Definition durchsuchen…" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full font-serif text-sm md:text-base pl-9 pr-4 py-2.5 rounded-lg border border-kraft-edge bg-[#fffaf0] text-ink placeholder:text-[#9c8f72] focus:outline-none focus:ring-1 focus:ring-stamp focus:border-stamp shadow-sm transition-all"
              aria-label="Begriffe durchsuchen"
            />
          </div>
          
          <div className="flex bg-kraft-edge rounded-full p-0.5 shadow-inner self-center sm:self-auto" role="tablist" aria-label="Ansicht wählen">
            <button 
              type="button" 
              onClick={() => setCurrentView('card')}
              className={`font-mono text-[0.72rem] px-4 py-2 rounded-full cursor-pointer transition-all flex items-center gap-1.5 ${
                currentView === 'card' 
                  ? 'bg-oak text-kraft shadow-md' 
                  : 'text-ink-soft hover:text-ink'
              }`}
              role="tab" 
              aria-selected={currentView === 'card'}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Karten
            </button>
            <button 
              type="button" 
              onClick={() => setCurrentView('list')}
              className={`font-mono text-[0.72rem] px-4 py-2 rounded-full cursor-pointer transition-all flex items-center gap-1.5 ${
                currentView === 'list' 
                  ? 'bg-oak text-kraft shadow-md' 
                  : 'text-ink-soft hover:text-ink'
              }`}
              role="tab" 
              aria-selected={currentView === 'list'}
            >
              <Grid className="w-3.5 h-3.5" />
              Liste ({FLASHCARDS.length})
            </button>
          </div>
        </div>

        {/* --- Filter Row --- */}
        <div className="flex items-center justify-center gap-2 font-mono text-[0.74rem] text-ink-soft mb-6">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none group">
            <input 
              type="checkbox" 
              checked={onlyUnlearned}
              onChange={(e) => setOnlyUnlearned(e.target.checked)}
              className="w-4 h-4 accent-stamp cursor-pointer border border-kraft-edge rounded"
            />
            <span className="group-hover:text-ink transition-colors">Nur ungelernte Karteikarten anzeigen</span>
          </label>
        </div>

        {/* ================= CARD VIEW ================= */}
        {currentView === 'card' && (
          <div>
            {/* Drawer Tabs (Alphabetical index) */}
            <div className="flex gap-1 flex-wrap justify-center relative z-10 px-3.5 -mb-3">
              {alphabetTabs.map((letter) => {
                const isActive = currentLetter === letter && cardIndices.length > 0;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => jumpToLetter(letter)}
                    className={`font-mono text-[0.72rem] font-semibold px-2.5 pt-1.5 pb-4 rounded-t border-none shadow-sm cursor-pointer transition-all transform hover:-translate-y-0.5 ${
                      isActive 
                        ? 'bg-stamp text-kraft font-bold z-20 scale-105' 
                        : 'bg-kraft text-ink hover:bg-[#fff9ea]'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Tactile Wooden Rail Base Container */}
            <div className="relative bg-gradient-to-b from-oak-light to-oak rounded-xl pt-7 pb-5 px-4 md:px-5 shadow-[0_12px_28px_rgba(0,0,0,0.32),_inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* Copper rivet icons on left and right for realistic details */}
              <div className="absolute top-2.5 left-3.5 w-2 h-2 rounded-full bg-gradient-to-tr from-[#8c7a4f] to-[#cbb98a] shadow-[0_1px_2px_rgba(0,0,0,0.4)]"></div>
              <div className="absolute top-2.5 right-3.5 w-2 h-2 rounded-full bg-gradient-to-tr from-[#8c7a4f] to-[#cbb98a] shadow-[0_1px_2px_rgba(0,0,0,0.4)]"></div>

              {/* Counter Indicator */}
              <div className="text-center font-mono text-[0.72rem] tracking-widest uppercase text-[#e7d9b4] mb-4 select-none">
                {cardIndices.length > 0 
                  ? `Karte ${currentPos + 1} von ${cardIndices.length}` 
                  : '0 Karten gefunden'}
              </div>

              {/* Stage containing Arrow Buttons & Card Slot */}
              <div className="flex items-center justify-between gap-2.5 md:gap-4">
                
                {/* Left Arrow */}
                <button 
                  type="button" 
                  onClick={() => handleStep(-1)}
                  disabled={cardIndices.length <= 1}
                  className="flex-none bg-kraft text-oak aspect-square w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-[0_4px_10px_rgba(0,0,0,0.25)] hover:bg-[#fff8e6] disabled:opacity-20 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-stamp outline-offset-1"
                  aria-label="Vorherige Karte"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Card Slot */}
                <div className="flex-1 max-w-[420px] mx-auto perspective-1400">
                  {cardIndices.length === 0 ? (
                    <div className="w-full aspect-[5/3.3] flex flex-col items-center justify-center text-center p-5 text-kraft font-mono text-sm leading-relaxed border border-dashed border-kraft/35 rounded-lg bg-oak/30">
                      <Layers className="w-8 h-8 opacity-40 mb-3 text-kraft" />
                      {onlyUnlearned
                        ? 'Hervorragend! Alle gefilterten Karten sind bereits gelernt.'
                        : 'Keine Treffer für diesen Suchbegriff gefunden.'}
                    </div>
                  ) : currentFlashcard ? (
                    <div 
                      ref={cardRef}
                      onClick={() => setIsFlipped(!isFlipped)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          setIsFlipped(!isFlipped);
                        }
                      }}
                      className="relative w-full h-[380px] cursor-pointer focus:outline-none focus:ring-4 focus:ring-stamp focus:ring-offset-4 focus:rounded-lg"
                      role="button"
                      aria-label="Karte klicken zum Umdrehen"
                    >
                      {/* Inner rotating object wrapper */}
                      <div className={`relative w-full h-full preserve-3d transition-transform duration-500 card-inner-transition ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}>
                        
                        {/* --- FRONT FACE --- */}
                        <div className={`absolute inset-0 backface-hidden bg-kraft rounded-md card-clip-path shadow-[0_12px_24px_rgba(0,0,0,0.35),_0_2px_0_var(--color-kraft-edge)] p-6 md:p-8 flex flex-col justify-between border-b-2 border-kraft-edge/40 ${
                          knownIds.has(currentFlashcard.originalIdx) ? 'border-t-4 border-stamp/70' : ''
                        }`}>
                          {/* Centered card holes detail */}
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.2 h-3.2 rounded-full bg-wall shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)]"></div>
                          {knownIds.has(currentFlashcard.originalIdx) && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[22px] h-[22px] rounded-full border-2 border-stamp/70 flex items-center justify-center">
                              <span className="text-[0.6rem] font-bold text-stamp/80 check-badge font-mono">OK</span>
                            </div>
                          )}

                          <div className="flex justify-between items-center mt-2">
                            <span className="font-mono text-[0.72rem] tracking-widest uppercase text-ink-soft select-none">
                              Index: {currentLetter}
                            </span>
                          </div>

                          <h2 className="font-display font-semibold text-lg sm:text-xl md:text-[1.65rem] leading-[1.2] text-ink my-auto text-center py-2">
                            {currentFlashcard.info.term}
                          </h2>

                          <span className="self-end font-mono text-[0.64rem] tracking-wider text-ink-soft/75 select-none hover:text-stamp transition-colors flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-stamp animate-pulse" />
                            Antwort zeigen...
                          </span>
                        </div>

                        {/* --- BACK FACE (Rotated Y 180) --- */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#fffcf5] border-t-4 border-stamp/60 rounded-md card-clip-path shadow-[0_12px_24px_rgba(0,0,0,0.35),_0_2px_0_var(--color-kraft-edge)] p-6 md:p-8 flex flex-col">
                          {/* Centered card holes detail */}
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.2 h-3.2 rounded-full bg-wall shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)]"></div>

                          <div className="font-mono text-[0.66rem] tracking-wider uppercase text-stamp/80 select-none pb-2 mt-1 border-b border-ink/10 flex justify-between items-center flex-none">
                            <span>Erklärung / Definition</span>
                            {knownIds.has(currentFlashcard.originalIdx) && (
                              <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                                ✓ Gelernt
                              </span>
                            )}
                          </div>
                          
                          <p className="definition-text text-[0.88rem] sm:text-sm md:text-[0.96rem] leading-relaxed text-ink mt-3 pr-1.5 scrollbar-thin">
                            {currentFlashcard.info.definition}
                          </p>
                        </div>

                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Right Arrow */}
                <button 
                  type="button" 
                  onClick={() => handleStep(1)}
                  disabled={cardIndices.length <= 1}
                  className="flex-none bg-kraft text-oak aspect-square w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-[0_4px_10px_rgba(0,0,0,0.25)] hover:bg-[#fff8e6] disabled:opacity-20 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-stamp outline-offset-1"
                  aria-label="Nächste Karte"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>

              </div>

              {/* Action Bar Custom Controls */}
              <div className="flex justify-center gap-2.5 mt-6 flex-wrap">
                <button 
                  type="button" 
                  onClick={handleShuffle}
                  disabled={cardIndices.length === 0}
                  className="font-mono text-[0.74rem] tracking-wide px-4 py-2 rounded-full border border-[#9c8f72] bg-kraft text-ink hover:bg-[#fffaf0] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Mischen
                </button>

                {currentFlashcard && (
                  <button 
                    type="button" 
                    onClick={() => toggleKnownStatus(currentFlashcard.originalIdx)}
                    className={`font-mono text-[0.74rem] tracking-wide px-4.5 py-2.5 rounded-full border cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 ${
                      knownIds.has(currentFlashcard.originalIdx)
                        ? 'bg-stamp text-kraft border-stamp hover:bg-[#ac4234] shadow-md'
                        : 'bg-kraft text-stamp border-stamp hover:bg-stamp hover:text-kraft font-semibold'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {knownIds.has(currentFlashcard.originalIdx) ? '↺ Nochmal lernen' : '✓ Gewusst'}
                  </button>
                )}

                <button 
                  type="button" 
                  onClick={handleResetAllProgress}
                  className="font-mono text-[0.74rem] text-[#e7d9b4] border border-[#e7d9b4]/35 hover:border-[#e7d9b4]/60 hover:bg-[#e7d9b4]/10 hover:text-white px-3.5 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  Fortschritt zurücksetzen
                </button>
              </div>

              {/* Progress Tracker Bar */}
              <div className="w-full max-w-[420px] mx-auto mt-6 bg-[#9c4d34]/25 h-1.5 rounded-full overflow-hidden shadow-inner relative">
                <div 
                  className="h-full bg-stamp rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="text-center font-mono text-[0.66rem] text-[#e7d9b4] mt-2 select-none">
                Gesamtfortschritt: {progressPercent}% ({knownIds.size} von {FLASHCARDS.length} gelernt)
              </div>
            </div>
            
            {/* Visual celebration banner when all cards are completed */}
            {progressPercent === 100 && (
              <div className="mt-4 bg-[#2b3a2a] text-[#daf4d3] border-l-4 border-emerald-500 rounded px-4 py-3 shadow-md flex items-center justify-between animate-bounce">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                  <span className="text-sm font-sans">
                    <strong>Hervorragend!</strong> Sie haben alle {FLASHCARDS.length} Business Intelligence Fachbegriffe erfolgreich gelernt!
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= LIST VIEW ================= */}
        {currentView === 'list' && (
          <ul className="grid gap-3.5">
            {FLASHCARDS.map((card, idx) => {
              const isKnown = knownIds.has(idx);
              const q = searchQuery.trim().toLowerCase();
              const termMatches = card.term.toLowerCase().includes(q);
              const defMatches = card.definition.toLowerCase().includes(q);
              
              const isVisible = (!q || termMatches || defMatches) && (!onlyUnlearned || !isKnown);
              
              if (!isVisible) return null;

              return (
                <li 
                  key={idx}
                  onClick={() => openInCardView(idx)}
                  className="list-none group bg-kraft hover:bg-[#fffbf2] rounded-lg p-4 md:p-4.5 cursor-pointer shadow-sm hover:shadow-md transition-all border border-kraft-edge/40 hover:border-kraft-edge flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase bg-[#e9dbba] px-2 py-0.5 rounded text-ink-soft select-none font-semibold">
                        {getLetterOfTerm(card.term)}
                      </span>
                      <strong className="font-display font-bold text-base md:text-lg text-ink group-hover:text-[#9c3b2e] transition-colors leading-tight">
                        {card.term}
                      </strong>
                    </div>
                    <p className="text-sm md:text-[0.93rem] text-ink-soft/90 mt-2.5 leading-relaxed font-serif pl-1">
                      {card.definition}
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleKnownStatus(idx);
                    }}
                    className={`flex-none w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isKnown 
                        ? 'bg-stamp text-kraft border-stamp' 
                        : 'border-kraft-edge hover:bg-kraft shadow-inner text-transparent hover:text-stamp/40'
                    }`}
                    title={isKnown ? 'Als zu lernen markieren' : 'Als gelernt markieren'}
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

      </div>
    </div>
  );
}
