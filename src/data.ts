import { Flashcard } from './types';

export const FLASHCARDS: Flashcard[] = [
  {
    term: "A/B-Test",
    definition: "Statistisches Verfahren, bei dem zwei Varianten, zum Beispiel einer Website oder einer Marketingkampagne, parallel gegeneinander getestet werden, um herauszufinden, welche Variante die bessere Leistung erzielt."
  },
  {
    term: "Augmented Analytics",
    definition: "Einsatz von künstlicher Intelligenz und maschinellem Lernen, um die Datenaufbereitung, Mustererkennung und Erkenntnisgewinnung in BI-Prozessen zu automatisieren und dadurch auch für Fachanwender ohne tiefe Analysekenntnisse zugänglich zu machen."
  },
  {
    term: "Batch-Verarbeitung",
    definition: "Datenverarbeitung, bei der Daten gesammelt und in regelmäßigen Zeitabständen, zum Beispiel stündlich oder täglich, als geschlossener Stapel verarbeitet werden, im Gegensatz zur kontinuierlichen Echtzeitverarbeitung."
  },
  {
    term: "Big Data",
    definition: "Datenmengen, die so groß, schnelllebig oder vielfältig sind, dass herkömmliche Datenverarbeitungsmethoden nicht mehr ausreichen. Geprägt durch die drei Eigenschaften Volume, Velocity und Variety."
  },
  {
    term: "Business Intelligence (BI)",
    definition: "Systematischer Prozess der Sammlung, Aufbereitung und Analyse von Unternehmensdaten mit dem Ziel, fundierte und faktenbasierte Geschäftsentscheidungen zu ermöglichen."
  },
  {
    term: "Cloud Computing",
    definition: "Bereitstellung von Rechenleistung, Speicher und Software über das Internet nach Bedarf, ohne eigene Hardware betreiben zu müssen. Ermöglicht flexible Skalierung von BI-Lösungen."
  },
  {
    term: "Data Catalog",
    definition: "Strukturiertes Verzeichnis aller im Unternehmen verfügbaren Datenquellen, angereichert mit Metadaten, um Anwendern das Suchen, Verstehen und Nutzen von Datensätzen zu erleichtern."
  },
  {
    term: "Data Governance",
    definition: "Gesamtheit der Regeln, Prozesse und Verantwortlichkeiten, die den ordnungsgemäßen Umgang mit Daten im Unternehmen sicherstellen, insbesondere im Hinblick auf Qualität, Sicherheit und gesetzliche Vorgaben."
  },
  {
    term: "Data Lake",
    definition: "Zentraler Speicher, der Daten in ihrem rohen, nativen Format aufnimmt, egal ob strukturiert, semi-strukturiert oder unstrukturiert. Das Schema wird erst beim Lesen der Daten angewendet."
  },
  {
    term: "Data Lineage",
    definition: "Nachverfolgbare Dokumentation des gesamten Weges, den ein Datum von der ursprünglichen Quelle über alle Transformationen bis zum finalen Bericht oder Dashboard zurückgelegt hat."
  },
  {
    term: "Data Literacy",
    definition: "Fähigkeit von Mitarbeitern, Daten zu verstehen, zu interpretieren, kritisch zu hinterfragen und auf ihrer Basis fundierte Entscheidungen zu treffen."
  },
  {
    term: "Data Mining",
    definition: "Automatisiertes Verfahren zur Entdeckung bisher unbekannter Muster, Zusammenhänge und Anomalien in großen Datenbeständen mittels statistischer und maschineller Lernverfahren."
  },
  {
    term: "Data Steward",
    definition: "Fachliche Rolle, die für die Pflege, Qualitätssicherung und konsistente Definition eines bestimmten Datenbestands verantwortlich ist und als Brücke zwischen IT und Fachbereichen fungiert."
  },
  {
    term: "Data Storytelling",
    definition: "Methode, Analyseergebnisse in eine erzählerische Struktur mit Kontext, visueller Aufbereitung und klarer Handlungsbotschaft zu verpacken, um sie für Entscheider verständlich und überzeugend zu machen."
  },
  {
    term: "Data Warehouse",
    definition: "Spezielle, von operativen Systemen getrennte Datenbank, die strukturierte, bereinigte und historisierte Daten speichert und für schnelle analytische Abfragen optimiert ist."
  },
  {
    term: "Datenhistorisierung",
    definition: "Speicherung von Daten mit ihren zeitlichen Gültigkeiten, sodass Änderungen an Stammdaten, zum Beispiel Kundenadressen, nicht einfach überschrieben, sondern versioniert werden und vergangene Zustände für Zeitreihenanalysen erhalten bleiben."
  },
  {
    term: "Datenkompression",
    definition: "Technik zur Reduzierung des Speicherbedarfs von Daten, indem wiederholte Muster und Redundanzen erkannt und effizienter abgelegt werden, was gleichzeitig die Abfragegeschwindigkeit erhöht."
  },
  {
    term: "Datenmodellierung",
    definition: "Strukturierung von Daten in Tabellen und Beziehungen nach einem definierten Schema, wie dem Sternschema oder Schneeflockenschema, um Analyseabfragen zu optimieren."
  },
  {
    term: "Datenpartitionierung",
    definition: "Aufteilung einer großen Tabelle in kleinere, physisch getrennte Segmente, zum Beispiel nach Monaten, sodass Abfragen nur die relevanten Segmente durchsuchen müssen und dadurch schneller werden."
  },
  {
    term: "Datenqualität",
    definition: "Grad, in dem ein Datensatz die Anforderungen an Vollständigkeit, Korrektheit, Konsistenz, Aktualität und Eindeutigkeit für seinen vorgesehenen Analysezweck erfüllt."
  },
  {
    term: "Deskriptive Analyse",
    definition: "Rückblickende Analyseform, die beschreibt, was in der Vergangenheit passiert ist, und Kennzahlen wie Umsätze, Stückzahlen oder Besucherzahlen in Berichten und Dashboards darstellt."
  },
  {
    term: "Dimensionsmodellierung",
    definition: "Modellierungsansatz für Data Warehouses, bei dem quantitative Fakten in einer zentralen Faktentabelle mit beschreibenden Dimensionstabellen in einem Sternschema verknüpft werden."
  },
  {
    term: "Drill-down-Funktion",
    definition: "Interaktive Navigation in einem Dashboard, bei der man von einer aggregierten Kennzahl, etwa Jahresumsatz, schrittweise zu detaillierteren Ebenen wie Quartal, Monat oder einzelner Transaktion hinabsteigt."
  },
  {
    term: "Drill-through-Funktion",
    definition: "Interaktive Navigation, die von einer aggregierten Ansicht direkt in eine darunterliegende, detaillierte Datentabelle oder einen Einzelbeleg führt, ohne dass die Zwischenstufen durchlaufen werden müssen."
  },
  {
    term: "Echtzeitdatenanalyse",
    definition: "Kontinuierliche Verarbeitung und Auswertung von Datenströmen unmittelbar nach ihrer Entstehung, sodass Dashboards und Alarme innerhalb von Sekunden oder Minuten aktualisiert werden können."
  },
  {
    term: "Echtzeit-Dashboard",
    definition: "Dashboard, das seine angezeigten Kennzahlen kontinuierlich oder in sehr kurzen Intervallen aktualisiert und so einen aktuellen Blick auf laufende Prozesse ermöglicht."
  },
  {
    term: "Embedded BI",
    definition: "Einbettung von BI-Funktionalitäten wie Diagrammen, Berichten oder Dashboards direkt in bestehende Fachanwendungen, CRM-Systeme oder Portale, sodass der Nutzer die Analyse ohne Wechsel der Arbeitsumgebung nutzen kann."
  },
  {
    term: "ETL (Extract, Transform, Load)",
    definition: "Prozess der Datenintegration, bei dem Daten aus Quellsystemen extrahiert, außerhalb des Zieldatenbanksystems transformiert und bereinigt und erst dann in das Data Warehouse geladen werden."
  },
  {
    term: "ELT (Extract, Load, Transform)",
    definition: "Prozess der Datenintegration, bei dem Daten zuerst in das Zielsystem geladen und erst dort, unter Nutzung der Rechenkraft der Zieldatenbank, transformiert werden. Typisch für Cloud-Data-Warehouse-Architekturen."
  },
  {
    term: "Fuzzy-Matching",
    definition: "Algorithmisches Verfahren, das Ähnlichkeiten zwischen Zeichenketten berechnet und so auch nicht-exakte Übereinstimmungen erkennt, etwa bei der Suche nach Duplikaten in Kundendaten mit Tippfehlern oder unterschiedlichen Schreibweisen."
  },
  {
    term: "Heatmap",
    definition: "Diagrammtyp, der Datenintensitäten durch Farbabstufungen auf einer zweidimensionalen Fläche darstellt, häufig genutzt für die Visualisierung von regionalen Umsatzverteilungen oder Klickverhalten auf Webseiten."
  },
  {
    term: "Hybrider BI-Ansatz",
    definition: "Kombination aus zentralen Governance-Vorgaben und einem zentralen Data Warehouse auf der einen Seite und dezentralen, flexiblen Self-Service-Analysen für Fachabteilungen auf der anderen Seite."
  },
  {
    term: "Hypothesentest",
    definition: "Statistisches Verfahren, mit dem eine aufgestellte Behauptung, zum Beispiel eine Marketingkampagne erhöht den Umsatz, anhand von Stichprobendaten auf ihre Gültigkeit überprüft wird."
  },
  {
    term: "Kausalität",
    definition: "Ursache-Wirkungs-Beziehung zwischen zwei Variablen, bei der eine Veränderung der einen Variable tatsächlich die Veränderung der anderen bewirkt, im Unterschied zur reinen Korrelation."
  },
  {
    term: "Korrelation",
    definition: "Statistisches Maß für den linearen Zusammenhang zwischen zwei Variablen. Eine hohe Korrelation bedeutet nicht automatisch, dass die eine Variable die andere verursacht."
  },
  {
    term: "KPI (Key Performance Indicator)",
    definition: "Quantitative Kennzahl, mit der der Erfolg oder Fortschritt einer unternehmerischen Maßnahme im Vergleich zu einem definierten Ziel gemessen wird, zum Beispiel Umsatzwachstum, Kundenbindungsrate oder Liefertreue."
  },
  {
    term: "Maschinelles Lernen (Machine Learning)",
    definition: "Teilgebiet der künstlichen Intelligenz, bei dem Algorithmen aus historischen Daten Muster lernen und diese auf neue, unbekannte Daten anwenden, um Vorhersagen zu treffen oder Klassifikationen vorzunehmen."
  },
  {
    term: "Metadatenmanagement",
    definition: "Systematische Erfassung, Pflege und Bereitstellung von beschreibenden Informationen über Daten, wie Herkunft, Bedeutung, Format, Verantwortlichkeit und Aktualisierungszeitpunkt, um die Nachvollziehbarkeit und Nutzbarkeit der Daten zu gewährleisten."
  },
  {
    term: "OLAP (Online Analytical Processing)",
    definition: "Analysetechnologie, die multidimensionale Abfragen auf Datenwürfeln ermöglicht und Anwendern erlaubt, Daten flexibel aus verschiedenen Perspektiven zu betrachten, zu aggregieren und per Drill-down zu detaillieren."
  },
  {
    term: "Pay-as-you-go-Modell",
    definition: "Preismodell im Cloud Computing, bei dem ein Unternehmen nur für die tatsächlich genutzte Rechenleistung und den verbrauchten Speicherplatz bezahlt, anstatt feste Hardwarekapizitäten vorzuhalten."
  },
  {
    term: "Prädiktive Analyse",
    definition: "Zukunftsgerichtete Analyseform, die auf Basis historischer Daten und statistischer Modelle Vorhersagen über wahrscheinliche zukünftige Ereignisse oder Trends trifft."
  },
  {
    term: "Präskriptive Analyse",
    definition: "Weiterentwicklung der prädiktiven Analyse, die nicht nur Vorhersagen trifft, sondern auch konkrete Handlungsempfehlungen ableitet und bewertet, welche Entscheidung unter gegebenen Rahmenbedingungen optimal ist."
  },
  {
    term: "Regressionsanalyse",
    definition: "Statistisches Verfahren zur Modellierung der Beziehung zwischen einer abhängigen Zielvariable und einer oder mehreren unabhängigen Einflussvariablen, um deren Einflussstärke zu quantifizieren."
  },
  {
    term: "Robotic Process Automation (RPA)",
    definition: "Technologie, die softwarebasierte Roboter einsetzt, um repetitive, regelbasierte manuelle Aufgaben wie Dateneingaben oder Dateitransfers zu automatisieren, häufig als Ergänzung zu ETL-Prozessen in BI."
  },
  {
    term: "Rollback von BI-Modellen",
    definition: "Zurücksetzen eines Analyse- oder Vorhersagemodells auf eine vorherige, validierte Version, falls eine neuere Version fehlerhaft ist oder schlechtere Ergebnisse liefert."
  },
  {
    term: "Rollenbasierte Zugriffsrechte",
    definition: "Sicherheitskonzept, bei dem der Zugriff auf Daten, Berichte und Dashboards nicht für jeden Nutzer einzeln, sondern basierend auf seiner organisatorischen Rolle, etwa Vertrieb, Controlling, Geschäftsführung, gesteuert wird."
  },
  {
    term: "Schneeflockenschema",
    definition: "Erweiterung des Sternschemas, bei dem die Dimensionstabellen zusätzlich normalisiert und in weitere hierarchische Untertabellen aufgespalten werden, was Speicherplatz spart, aber komplexere Abfragen erzeugt."
  },
  {
    term: "Self-Service BI",
    definition: "Ansatz, bei dem Fachanwender aus den Fachabteilungen eigenständig, ohne Unterstützung der IT, Daten analysieren, Dashboards erstellen und Berichte generieren können."
  },
  {
    term: "Single Source of Truth",
    definition: "Prinzip, nach dem es für jede geschäftsrelevante Kennzahl eine einzige, verbindliche und von allen genutzte Datenquelle gibt, sodass Widersprüche zwischen verschiedenen Berichten und Abteilungen vermieden werden."
  },
  {
    term: "Sternschema",
    definition: "Datenmodell für Data Warehouses, bei dem eine zentrale Faktentabelle mit Kennzahlen von mehreren denormalisierten Dimensionstabellen umgeben ist, die beschreibende Attribute enthalten. Einfach und performant für BI-Abfragen."
  },
  {
    term: "Streaming Analytics",
    definition: "Echtzeitanalyse von kontinuierlichen Datenströmen, etwa von Sensoren, Finanzmarktdaten oder Webklickpfaden, mit dem Ziel, Muster und Abweichungen sofort nach der Entstehung zu erkennen."
  },
  {
    term: "3 Vs von Big Data",
    definition: "Drei definierende Eigenschaften von Big Data: Volume (riesige Datenmengen), Velocity (hohe Geschwindigkeit der Datenerzeugung und -verarbeitung) und Variety (Vielfalt an strukturierten, semi-strukturierten und unstrukturierten Datenformaten)."
  },
  {
    term: "Zeitreihenanalyse",
    definition: "Statistische Methode zur Analyse von Datenpunkten, die in zeitlicher Abfolge erhoben wurden, um Trends, saisonale Muster und zyklische Schwankungen zu erkennen und Prognosen für künftige Zeitpunkte abzuleiten."
  }
];
