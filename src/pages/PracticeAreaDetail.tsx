import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Building2,
  Users,
  Car,
  Handshake,
  UsersRound,
  FileText,
  Flag,
  Scale,
  Briefcase,
  Shield,
  Landmark,
  TrendingUp,
  FileCheck,
  Gavel,
  ShieldCheck,
  Building,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PracticeAreaSection {
  icon: any;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

interface PracticeAreaData {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  sections: PracticeAreaSection[];
}

const practiceAreas: Record<string, PracticeAreaData> = {
  "drept-civil": {
    id: "drept-civil",
    title: "Drept civil",
    titleEn: "Civil Law",
    description:
      "Avocații de la Frunză & Asociații se bucură de o reputație remarcabilă în domeniul dreptului civil, construită printr-o experiență vastă în gestionarea unor cauze complexe și prin rezultate consecvente în favoarea clienților.",
    descriptionEn:
      "The attorneys at Frunză & Asociații enjoy a strong reputation in civil law, built on extensive experience in handling complex cases and achieving consistent results for clients.",
    sections: [
      {
        icon: Building2,
        title: "DREPTUL DE PROPRIETATE",
        titleEn: "PROPERTY LAW",
        content:
          "FRUNZĂ ȘI ASOCIAȚII are expertiză semnificativă în litigiile privitoare la restituirea proprietăților preluate abuziv, asigurând atât consultanță cât și reprezentare în instanță în vederea reconstituirii dreptului de proprietate. Echipa noastră asigură asistență juridică inclusiv în procedura administrativă de întregire a proprietății, specifică Legii fondului funciar nr. 18/1991.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII has significant expertise in disputes regarding the restitution of illegally seized properties, providing both consulting and court representation for property rights restoration. Our team provides legal assistance including in administrative procedures for property completion, specific to Land Fund Law No. 18/1991.",
      },
      {
        icon: FileText,
        title: "TRANZACȚII IMOBILIARE. CADASTRU ȘI CARTE FUNCIARĂ",
        titleEn: "REAL ESTATE TRANSACTIONS. CADASTRE AND LAND REGISTRY",
        content:
          "FRUNZĂ ȘI ASOCIAȚII acordă asistență juridică în dezvoltarea proiectelor imobiliare la nivel de negocieri, redactare de contracte, analiză a documentației juridice, de urbanism, de cadastru și de carte funciară, necesare pentru încheierea tranzacțiilor. În acest sens, echipa noastră asistă clienții la întocmirea contractelor de vânzare-cumpărare, antrepriză și subantrepriză, superficie, uzufruct, arendă, antrepriză și locațiune. FRUNZĂ ȘI ASOCIAȚII asigură asistență și reprezentare juridică în litigiile ce pot interveni în procesul dezvoltării imobiliare și își sprijină clienții în diligențe cu autoritățile care emit/prelungesc/suspendă/retrag autorizațiile de construcție.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance in real estate project development including negotiations, contract drafting, analysis of legal, urban planning, cadastral and land registry documentation necessary for completing transactions. Our team assists clients in drafting sale-purchase, construction and subcontracting, superficies, usufruct, tenancy and lease agreements. We provide legal assistance and representation in disputes arising during real estate development and support clients in proceedings with authorities issuing/extending/suspending/withdrawing construction permits.",
      },
      {
        icon: Users,
        title: "DREPTUL FAMILIEI",
        titleEn: "FAMILY LAW",
        content:
          "FRUNZĂ ȘI ASOCIAȚII reprezintă clienții în litigiile de divorț cu sau fără copii, inclusiv în cauzele având ca obiect partajul, precum și în negocierile dintre părți purtate în vederea obținerii unei soluții amiabile. FRUNZĂ ȘI ASOCIAȚII asigură asistență juridică și în cazurile de divorț prin acord, având experiență în consilierea părților în toate aspectele ce țin de desfacerea căsătoriei, inclusiv partajarea bunurilor, relațiile minorilor cu părintele nerezident, cuantumul pensiei de întreținere.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII represents clients in divorce litigation with or without children, including cases concerning asset division, as well as in negotiations between parties aimed at reaching an amicable solution. We provide legal assistance in divorce by mutual consent cases, having experience in advising parties on all aspects of marriage dissolution, including property division, minor children's relations with the non-resident parent, and alimony amounts.",
      },
      {
        icon: Handshake,
        title: "REDACTAREA ȘI NEGOCIEREA CONTRACTELOR",
        titleEn: "CONTRACT DRAFTING AND NEGOTIATION",
        content:
          "FRUNZĂ ȘI ASOCIAȚII acordă consultanță și asistență juridică în negocierea și redactarea contractelor civile și a celor încheiate între profesioniști, indiferent de tipul acestora, reprezentând clienții inclusiv în fața instanțelor de judecată competente și/sau în fața instanțelor arbitrale, precum și în fața sau în contradictoriu cu autoritățile publice.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides consulting and legal assistance in negotiating and drafting civil contracts and those concluded between professionals, regardless of type, representing clients before competent courts and/or arbitral tribunals, as well as before or in dispute with public authorities.",
      },
      {
        icon: UsersRound,
        title: "SUCCESIUNI",
        titleEn: "INHERITANCE",
        content:
          "FRUNZĂ ȘI ASOCIAȚII acordă asistență juridică în procedurile notariale având ca obiect stabilirea drepturilor succesorale și asigură reprezentarea clienților în fața instanțelor de judecată în cauzele privind partajul succesoral.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance in notarial procedures regarding the establishment of inheritance rights and ensures client representation before courts in succession partition cases.",
      },
    ],
  },

  "drept-societar": {
    id: "drept-societar",
    title: "Drept societar",
    titleEn: "Corporate Law",
    description:
      "FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentanță juridică în procedurile de înființare și înregistrare a societăților comerciale de orice tip, redactând actele constitutive, actele de modificare ale acestora, majorări/diminuări de capital social, cesiuni de părți sociale, fuziuni/divizări, dizolvare, lichidare și radiere.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation in company formation and registration procedures of any type, drafting founding documents, amendments, capital increases/decreases, share transfers, mergers/demergers, dissolution, liquidation and deregistration.",
    sections: [
      {
        icon: Briefcase,
        title: "ÎNFIINȚARE ȘI ORGANIZARE SOCIETĂȚI",
        titleEn: "COMPANY FORMATION AND ORGANIZATION",
        content:
          "FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentanță juridică în procedurile de înființare și înregistrare a societăților comerciale de orice tip, sens în care redactează actele constitutive, actele de modificare ale acestora, majorări/diminuări de capital social, cesiuni de părți sociale, fuziuni/divizări, dizolvare, lichidare și radiere. Echipa noastră participă la adunările asociaților/acționarilor pentru a asigura corecta adoptare a deciziilor de către organele de conducere ale societății, în funcție de oportunitățile economice urmărite.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation in company formation and registration procedures of any type, drafting founding documents, amendments, capital increases/decreases, share transfers, mergers/demergers, dissolution, liquidation and deregistration. Our team participates in shareholders'/associates' meetings to ensure proper decision-making by company management bodies according to pursued economic opportunities.",
      },
    ],
  },

  "fundatii-asociatii": {
    id: "fundatii-asociatii",
    title: "Fundații și asociații",
    titleEn: "Foundations and Associations",
    description:
      "Societatea FRUNZĂ ȘI ASOCIAȚII asigură asistență și reprezentare juridică în fața instanțelor/autorităților competente pentru înființarea și înregistrarea entităților non-profit.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation before competent courts/authorities for the establishment and registration of non-profit entities.",
    sections: [
      {
        icon: Users,
        title: "ENTITĂȚI NON-PROFIT",
        titleEn: "NON-PROFIT ENTITIES",
        content:
          "Societatea FRUNZĂ ȘI ASOCIAȚII asigură asistență și reprezentare juridică în fața instanțelor/autorităților competente pentru înființarea și înregistrarea entităților non-profit, oferind servicii privind consultanța în materia specială a fundațiilor și asociațiilor, redactarea statutelor, a contractelor cu personalul angajat, acordând inclusiv consultanță pe parcursul funcționării acestora.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation before competent courts/authorities for the establishment and registration of non-profit entities, offering specialized consulting services for foundations and associations, drafting statutes and employment contracts, and providing ongoing operational consulting.",
      },
    ],
  },

  "drept-munca": {
    id: "drept-munca",
    title: "Dreptul muncii",
    titleEn: "Labor Law",
    description:
      "FRUNZĂ ȘI ASOCIAȚII reprezintă clienții în litigii de muncă, asigurând reprezentare juridică atât angajaților, în vederea respectării drepturilor ce decurg din raporturi de subordonare, cât și angajatorilor care sunt nevoiți să procedeze la desființarea posturilor.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII represents clients in labor disputes, providing legal representation to both employees to ensure respect for rights arising from employment relationships, and employers required to eliminate positions.",
    sections: [
      {
        icon: Briefcase,
        title: "LITIGII DE MUNCĂ",
        titleEn: "LABOR DISPUTES",
        content:
          "FRUNZĂ ȘI ASOCIAȚII reprezintă clienții în litigii de muncă, asigurând reprezentare juridică atât angajaților, în vederea respectării drepturilor ce decurg din raporturi de subordonare, cât și angajatorilor care sunt nevoiți să procedeze la desființarea posturilor. Echipa noastră asistă angajatorii în procedurile de restructurare, concedieri colective și concedieri individuale, îndrumând clienții în respectarea procedurilor impuse de lege.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII represents clients in labor disputes, providing legal representation to both employees to ensure respect for rights arising from employment relationships, and employers required to eliminate positions. Our team assists employers in restructuring procedures, collective dismissals and individual dismissals, guiding clients in compliance with legally required procedures.",
      },
      {
        icon: FileText,
        title: "CONTRACTE COLECTIVE DE MUNCĂ",
        titleEn: "COLLECTIVE LABOR AGREEMENTS",
        content:
          "Avocații FRUNZĂ ȘI ASOCIAȚII asistă angajatorii în negocierea și redactarea contractelor colective de muncă.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII attorneys assist employers in negotiating and drafting collective labor agreements.",
      },
    ],
  },

  "proceduri-speciale": {
    id: "proceduri-speciale",
    title:
      "Proceduri speciale. Ordonanța de plată. Procedura de evacuare. Ordonanța președințială",
    titleEn:
      "Special Procedures. Payment Order. Eviction Procedure. Presidential Ordinance",
    description:
      "FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentare juridică în proceduri având ca obiect ordonanța președințială, ordonanța de plată, procedura de evacuare, punerea în posesie, predarea de bunuri.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation in proceedings concerning presidential ordinances, payment orders, eviction procedures, putting in possession, and handover of goods.",
    sections: [
      {
        icon: FileCheck,
        title: "PROCEDURI DE RECUPERARE CREANȚE",
        titleEn: "DEBT RECOVERY PROCEDURES",
        content:
          "FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentare juridică în proceduri având ca obiect ordonanța președințială, ordonanța de plată, procedura de evacuare, punerea în posesie, predarea de bunuri. Avocații FRUNZĂ ȘI ASOCIAȚII oferă soluții pentru recuperarea pe cale amiabilă a oricărei creanțe, acordând asistență juridică în negocierile privind eșalonarea plăților și a recuperării creanțelor.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation in proceedings concerning presidential ordinances, payment orders, eviction procedures, putting in possession, and handover of goods. Our attorneys offer solutions for amicable debt recovery, providing legal assistance in negotiations regarding payment installments and debt recovery.",
      },
      {
        icon: Shield,
        title: "CONTESTAȚII LA EXECUARE",
        titleEn: "ENFORCEMENT CHALLENGES",
        content:
          "Echipa FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentare juridică cu privire la soluționarea contestațiilor la execuare în oricare dintre modalitățile de executare silită și în legătură cu orice alte acțiuni de anulare a titlurilor executorii.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation regarding resolution of enforcement challenges in any enforcement methods and concerning any other actions to annul enforcement titles.",
      },
    ],
  },

  "drept-fiscal": {
    id: "drept-fiscal",
    title: "Drept fiscal",
    titleEn: "Tax Law",
    description:
      "Avocații FRUNZĂ ȘI ASOCIAȚII acordă consultanță, asistență și reprezentare juridică persoanelor fizice și juridice în legătură cu temeinicia deciziilor de impunere și eșalonarea datoriilor de natură fiscală.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII attorneys provide consulting, assistance and legal representation to individuals and legal entities regarding the validity of tax assessment decisions and tax debt installment plans.",
    sections: [
      {
        icon: Briefcase,
        title: "CONSULTANȚĂ FISCALĂ",
        titleEn: "TAX CONSULTING",
        content:
          "Avocații FRUNZĂ ȘI ASOCIAȚII acordă consultanță, asistență și reprezentare juridică persoanelor fizice și juridice în legătură cu temeinicia deciziilor de impunere și eșalonarea datoriilor de natură fiscală. FRUNZĂ ȘI ASOCIAȚII reprezintă interesele clienților în litigii fiscale cu autoritățile competente și în orice alte spețe de natură administrativ-fiscală.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII attorneys provide consulting, assistance and legal representation to individuals and legal entities regarding the validity of tax assessment decisions and tax debt installment plans. We represent clients' interests in tax disputes with competent authorities and in any other administrative-fiscal matters.",
      },
      {
        icon: FileText,
        title: "LITIGII FISCALE",
        titleEn: "TAX DISPUTES",
        content:
          "Expertiza FRUNZĂ ȘI ASOCIAȚII este relevantă în litigii având ca obiect impozitul pe venit/profit și contestarea deciziilor de impunere, indiferent de natura debitului fiscal.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII expertise is relevant in disputes concerning income/profit tax and challenging tax assessment decisions, regardless of the nature of the tax debt.",
      },
    ],
  },

  "drept-penal": {
    id: "drept-penal",
    title: "Drept penal. Latura civilă a dreptului penal",
    titleEn: "Criminal Law. Civil Side of Criminal Law",
    description:
      "FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentare juridică în legătură cu fapte incriminate de legea penală, inclusiv infracțiuni economice, în faza de urmărire penală și în fața instanțelor de judecată.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation regarding acts criminalized by criminal law, including economic crimes, during criminal investigation and before courts.",
    sections: [
      {
        icon: Shield,
        title: "APĂRARE PENALĂ",
        titleEn: "CRIMINAL DEFENSE",
        content:
          "FRUNZĂ ȘI ASOCIAȚII acordă asistență și reprezentare juridică în legătură cu fapte incriminate de legea penală, inclusiv infracțiuni economice, în faza de urmărire penală și în fața instanțelor de judecată. În faza de urmărire penală, asistăm clienții în administrarea probatoriului, iar în faza de judecată, reprezentăm clienții atât în camera preliminară, cât și în cercetarea judecătorească.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation regarding acts criminalized by criminal law, including economic crimes, during criminal investigation and before courts. During investigation, we assist clients in evidence administration, and during trial, we represent clients both in preliminary chambers and in judicial investigation.",
      },
      {
        icon: Users,
        title: "DAUNE CIVILE",
        titleEn: "CIVIL DAMAGES",
        content:
          "De asemenea, reprezentăm victimele sau descendenții acestora pentru obținerea daunelor civile la care sunt îndreptățite.",
        contentEn:
          "We also represent victims or their descendants to obtain civil damages to which they are entitled.",
      },
    ],
  },

  malpraxis: {
    id: "malpraxis",
    title: "Malpraxis",
    titleEn: "Malpractice",
    description:
      "FRUNZĂ ȘI ASOCIAȚII asigură asistență și reprezentare juridică în spețele care au ca obiect generarea de prejudicii din culpă/neglijență profesională în dauna pacienților/clienților.",
    descriptionEn:
      "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation in cases involving damages caused by professional negligence/malpractice against patients/clients.",
    sections: [
      {
        icon: Shield,
        title: "CAZURI DE MALPRAXIS",
        titleEn: "MALPRACTICE CASES",
        content:
          "FRUNZĂ ȘI ASOCIAȚII asigură asistență și reprezentare juridică în spețele care au ca obiect generarea de prejudicii din culpă/neglijență profesională în dauna pacienților/clienților. Serviciile oferite de avocații noștri vizează inclusiv negocierea în vederea soluționării pe cale amiabilă a cazurilor de malpraxis, redactarea tranzacțiilor și asigurarea asistenței la semnarea acestora precum și asistarea și reprezentarea în procedura complexă a recuperării efective a daunelor datorate.",
        contentEn:
          "FRUNZĂ ȘI ASOCIAȚII provides legal assistance and representation in cases involving damages caused by professional negligence/malpractice against patients/clients. Our attorneys' services include negotiation for amicable resolution of malpractice cases, drafting settlements and providing assistance at their signing, as well as assistance and representation in the complex procedure of effectively recovering owed damages.",
      },
    ],
  },
};

// Nu am inclus importurile aici, deoarece nu făceau parte din
// funcția pe care ai trimis-o, dar asigură-te că le ai în fișier:
// import { useParams, useNavigate } from "react-router-dom";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { Button } from "@/components/ui/button";
// etc.

// Asigură-te că ai toate importurile necesare aici
// import { useParams, useNavigate } from "react-router-dom";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { Button } from "@/components/ui/button";
// etc.

export default function PracticeAreaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mapping URL slug -> cheia internă
  const slugs: Record<string, string> = {
    // English slugs
    insolvency: "insolventa",
    arbitration: "arbitraj-executare",
    "civil-law": "drept-civil",
    "intellectual-property": "proprietate-intelectuala",
    "corporate-law": "drept-societar",
    "debt-recovery": "restructurare-recuperare",
    "banking-finance-law": "drept-financiar",
    "enforcement-procedures": "proceduri-executare-silita",
    "administrative-law": "drept-administrativ-fiscal",
    "competition-law": "drept-concurenta-ajutor",
    "labor-law": "drept-munca",
    "consumer-protection": "protectia-consumatorului",
    "environmental-law": "drept-mediu",
    "human-rights": "drepturile-omului-cedo",
    "criminal-law": "drept-penal",
    "public-procurement": "achizitii-publice",
    // Romanian slugs (direct mapping)
    "drept-civil": "drept-civil",
    "drept-comercial": "drept-comercial",
    litigii: "litigii",
    "drept-penal": "drept-penal",
    "drept-administrativ": "drept-administrativ",
    "proprietate-intelectuala": "proprietate-intelectuala",
  };

  const key = id ? slugs[id] || id : null;
  const practiceArea = key ? practiceAreas[key] : null;

  if (!practiceArea) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">
            {t("Domeniu de practică negăsit", "Practice area not found")}
          </h1>
          <Button onClick={() => navigate("/despre")}>
            {t("Înapoi la Despre", "Back to About")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')] bg-cover bg-center opacity-30"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <p className="text-sm uppercase tracking-wider mb-4 opacity-90">
            / {t("DOMENII DE PRACTICĂ", "PRACTICE AREAS")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            {t(practiceArea.title, practiceArea.titleEn)}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t(practiceArea.description, practiceArea.descriptionEn)}
              </p>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t(
                  "Frunză & Asociații oferă servicii complete de consultanță juridică și asistență în reprezentarea clienților, atât pentru companii românești și internaționale active în diverse sectoare economice, cât și pentru persoane fizice.",
                  "Frunză & Asociații offers consulting services and provides legal assistance and representation to both national or multinational companies active in various economic sectors, as well as individuals."
                )}
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="columns-1 md:columns-2 md:gap-x-12 space-y-12">
            {practiceArea.sections.map((section, idx) => (
              <div key={idx} className="flex gap-6 break-inside-avoid">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
                    {t(section.title, section.titleEn)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t(section.content, section.contentEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
