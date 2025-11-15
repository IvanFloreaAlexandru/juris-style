import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

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
      "Avocații de la Frunză & Asociații se bucură de o reputație remarcabilă în domeniul dreptului civil, construită printr-o experiență vastă în gestionarea unor cauze complexe și prin rezultate consecvente în favoarea clienților. Practica noastră se distinge prin rigoare juridică, profesionalism și o înțelegere profundă a raporturilor juridice civile, oferind soluții eficiente și personalizate pentru fiecare situație.",
    descriptionEn:
      "The attorneys at Frunză & Asociații enjoy a strong reputation in civil law, built on extensive experience in handling complex cases and achieving consistent results for clients. Our civil law practice is characterized by legal precision, professionalism, and a deep understanding of civil legal relationships, providing effective and tailored solutions for every situation.",

    sections: [
      {
        icon: Building2,
        title: "IMOBILIAR, CADASTRU ȘI CARTE FUNCIARĂ",
        titleEn: "REAL ESTATE, CADASTRE AND LAND REGISTRY",
        content:
          "Frunză & Asociații oferă asistență juridică completă în domeniul dreptului imobiliar, atât persoanelor fizice, cât și societăților comerciale, în proiecte complexe – clădiri de birouri, ansambluri rezidențiale, construcții industriale. Serviciile noastre includ efectuarea analizelor de tip due diligence, negocierea, redactarea și revizuirea documentației juridice, de urbanism, de cadastru și carte funciară, necesare finalizării tranzacțiilor imobiliare. De asemenea, asistăm clienții în încheierea și derularea contractelor de vânzare, antrepriză, închiriere, arendă, superficie, uzufruct și în litigii privind proprietatea sau restituirea bunurilor imobile.",
        contentEn:
          "Frunză & Asociații provides comprehensive legal assistance in real estate law to both individuals and companies involved in complex projects such as office buildings, residential complexes, and industrial constructions. Our services include due diligence analyses, negotiation, drafting, and review of legal, urban planning, cadastral, and land registry documentation necessary for completing real estate transactions. We also assist clients in concluding and executing sale, construction, lease, tenancy, superficies, and usufruct contracts, as well as in litigation concerning ownership or property restitution.",
      },

      {
        icon: FileText,
        title: "CONTRACTE CIVILE ȘI COMERCIALE",
        titleEn: "CIVIL AND COMMERCIAL CONTRACTS",
        content:
          "Echipa Frunză & Asociații acordă consultanță juridică specializată în negocierea, redactarea și executarea contractelor civile și comerciale. Asistăm societăți, instituții financiare și autorități publice în toate etapele contractuale – de la structurare și redactare, până la interpretare și soluționarea litigiilor. Portofoliul nostru include contracte de vânzare, închiriere, împrumut, distribuție, mandat, antrepriză, gaj, leasing, comision, donație, sponsorizare, joint-venture, asigurare, agenție și publicitate.",
        contentEn:
          "Frunză & Asociații provides specialized legal consulting in the negotiation, drafting, and execution of civil and commercial contracts. We assist companies, financial institutions, and public authorities in all contractual stages – from structuring and drafting to interpretation and dispute resolution. Our portfolio includes sale, lease, loan, distribution, mandate, construction, pledge, leasing, commission, donation, sponsorship, joint venture, insurance, agency, and advertising agreements.",
      },

      {
        icon: Users,
        title: "MOȘTENIRI ȘI PARTAJE",
        titleEn: "INHERITANCE AND PARTITION",
        content:
          "Frunză & Asociații oferă consultanță și reprezentare juridică în proceduri notariale și judiciare privind succesiuni și partaje de bunuri. Asistăm clienții – persoane fizice sau juridice – în stabilirea drepturilor succesorale, redactarea actelor de partaj voluntar, soluționarea disputelor între moștenitori și valorificarea drepturilor asupra bunurilor moștenite.",
        contentEn:
          "Frunză & Asociații provides legal consulting and representation in notarial and judicial procedures concerning inheritance and asset partition. We assist clients – individuals and legal entities – in establishing inheritance rights, drafting voluntary partition agreements, resolving disputes among heirs, and enforcing property rights over inherited assets.",
      },

      {
        icon: Car,
        title: "RĂSPUNDERE CIVILĂ DELICTUALĂ ȘI CONTRACTUALĂ",
        titleEn: "CIVIL AND CONTRACTUAL LIABILITY",
        content:
          "Avocații Frunză & Asociații asigură asistență și reprezentare în cauze privind răspunderea civilă delictuală și contractuală, rezultate din fapte ilicite sau din neexecutarea obligațiilor contractuale. Practica noastră acoperă situații precum malpraxis, accidente rutiere sau de muncă, fapte penale și alte cauze generatoare de prejudicii, urmărind obținerea despăgubirilor corespunzătoare pentru clienți.",
        contentEn:
          "The attorneys at Frunză & Asociații provide assistance and representation in matters concerning civil and contractual liability arising from unlawful acts or breaches of contractual obligations. Our practice covers cases such as malpractice, traffic or workplace accidents, criminal acts, and other damage-causing events, aiming to obtain fair compensation for our clients.",
      },

      {
        icon: Handshake,
        title: "GARANȚII ȘI EXECUTARE SILITĂ",
        titleEn: "GUARANTEES AND ENFORCEMENT",
        content:
          "Frunză & Asociații oferă asistență juridică în constituirea și publicitatea garanțiilor reale și personale, precum și în procedurile de executare a acestora. Oferim suport în redactarea și înregistrarea documentației specifice, îndeplinirea formalităților legale, precum și în procedurile de recuperare a creanțelor și contestare a executării silite.",
        contentEn:
          "Frunză & Asociații provides legal assistance in establishing and publicizing personal and real guarantees, as well as in their enforcement procedures. We offer support in drafting and registering the necessary documentation, fulfilling legal formalities, and conducting debt recovery or enforcement challenge proceedings.",
      },

      {
        icon: UsersRound,
        title: "DREPTUL FAMILIEI",
        titleEn: "FAMILY LAW",
        content:
          "Frunză & Asociații dispune de o experiență semnificativă în soluționarea cauzelor privind relațiile de familie, oferind asistență juridică în proceduri judiciare și de mediere. Practica noastră include divorțuri, stabilirea autorității părintești, partajul bunurilor comune, filiație, adopții și cazuri internaționale de răpire de minori.",
        contentEn:
          "Frunză & Asociații has extensive experience in resolving family law matters, providing legal assistance in judicial and mediation procedures. Our practice includes divorce, determination of parental authority, division of common assets, filiation, adoption, and international child abduction cases.",
      },

      {
        icon: Flag,
        title: "DREPT INTERNAȚIONAL PRIVAT",
        titleEn: "PRIVATE INTERNATIONAL LAW",
        content:
          "Avocații Frunză & Asociații, specializați în drept internațional privat, asistă clienții în cauze cu elemente de extraneitate, inclusiv în determinarea instanței competente și a legii aplicabile, precum și în procedurile de recunoaștere și executare a hotărârilor judecătorești sau arbitrale străine, în România și în spațiul Uniunii Europene.",
        contentEn:
          "Frunză & Asociații attorneys, specialized in private international law, assist clients in cases involving cross-border elements, including determining the competent court and applicable law, as well as in recognition and enforcement procedures for foreign judicial or arbitral decisions in Romania and within the European Union.",
      },
    ],
  },
  "proceduri-executare-silita": {
    id: "proceduri-executare-silita",
    title: "Proceduri de executare silită",
    titleEn: "Enforcement Procedures",
    description:
      "Oferim asistență juridică completă în toate etapele executării silite, apărând drepturile creditorilor și debitorilor. Gestionăm cu profesionalism procedurile de executare, contestațiile și recuperarea efectivă a creanțelor.",
    descriptionEn:
      "We provide comprehensive legal assistance in all stages of enforcement proceedings, defending the rights of both creditors and debtors. We professionally handle enforcement actions, objections, and effective debt recovery.",
    sections: [
      {
        icon: Shield,
        title: "ASISTENȚĂ PENTRU CREDITORI",
        titleEn: "ASSISTANCE FOR CREDITORS",
        content:
          "Consiliem și reprezentăm creditorii în demararea procedurilor de executare silită, identificarea bunurilor debitorului, întocmirea documentației necesare și colaborarea cu executorii judecătorești. Urmărim obținerea rapidă și eficientă a creanțelor.",
        contentEn:
          "We advise and represent creditors in initiating enforcement procedures, identifying debtor assets, preparing required documentation, and cooperating with bailiffs. We ensure fast and efficient debt recovery.",
      },
      {
        icon: FileText,
        title: "CONTESTAȚII LA EXECUTARE",
        titleEn: "ENFORCEMENT OBJECTIONS",
        content:
          "Asigurăm reprezentarea clienților în formularea și susținerea contestațiilor la executare, vizând anularea actelor nelegale, suspendarea executării și protejarea bunurilor împotriva măsurilor abuzive.",
        contentEn:
          "We represent clients in filing and supporting enforcement objections, aiming to annul unlawful acts, suspend enforcement, and protect assets from abusive measures.",
      },
      {
        icon: Briefcase,
        title: "EXECUTARE IMOBILIARĂ ȘI MOBILIARĂ",
        titleEn: "REAL ESTATE AND MOVABLE ENFORCEMENT",
        content:
          "Gestionăm executările silite asupra bunurilor imobile și mobile, licitațiile publice, sechestrările și valorificarea bunurilor. Oferim consultanță atât persoanelor fizice, cât și companiilor implicate în astfel de proceduri.",
        contentEn:
          "We manage enforcement on real estate and movable assets, public auctions, seizures, and asset liquidation. We provide legal consulting for both individuals and companies involved in such proceedings.",
      },
      {
        icon: HelpCircle,
        title: "NEGOCIERI ȘI MEDIERE EXECUTORIE",
        titleEn: "NEGOTIATION AND MEDIATION IN ENFORCEMENT",
        content:
          "Încurajăm soluționarea amiabilă a litigiilor prin negocieri între creditor și debitor, restructurări de datorii și mediere, evitând costurile și durata procedurilor judiciare. Oferim suport juridic complet în aceste demersuri.",
        contentEn:
          "We promote amicable settlement of disputes through negotiations between creditor and debtor, debt restructuring, and mediation, avoiding the costs and duration of judicial procedures. We provide full legal support in these processes.",
      },
    ],
  },

  "drept-comercial": {
    id: "drept-comercial",
    title: "Drept comercial",
    titleEn: "Commercial Law",
    description:
      "Echipa noastră oferă consiliere juridică completă în domeniul dreptului comercial, acoperind toate aspectele activității comerciale, de la înființarea societăților până la fuziuni și achiziții complexe.",
    descriptionEn:
      "Our team offers comprehensive legal advice in commercial law, covering all aspects of commercial activity, from company incorporation to complex mergers and acquisitions.",
    sections: [
      {
        icon: Building,
        title: "SOCIETĂȚI COMERCIALE",
        titleEn: "COMMERCIAL COMPANIES",
        content:
          "Oferim asistență completă pentru înființarea, reorganizarea și lichidarea societăților comerciale. Consiliem clienții în alegerea formei juridice optime, în redactarea actelor constitutive și în îndeplinirea formalităților legale de înregistrare.",
        contentEn:
          "We offer complete assistance for the incorporation, reorganization and liquidation of commercial companies. We advise clients in choosing the optimal legal form, drafting constitutive documents and fulfilling legal registration formalities.",
      },
      {
        icon: TrendingUp,
        title: "FUZIUNI ȘI ACHIZIȚII",
        titleEn: "MERGERS & ACQUISITIONS",
        content:
          "Echipa noastră gestionează tranzacții complexe de fuziuni și achiziții, oferind servicii de due diligence juridic, negociere și redactare a documentației tranzacționale, precum și asistență în procesul de finalizare a tranzacției.",
        contentEn:
          "Our team manages complex merger and acquisition transactions, providing legal due diligence services, negotiation and drafting of transaction documentation, as well as assistance in the transaction closing process.",
      },
      {
        icon: FileCheck,
        title: "CONTRACTE COMERCIALE",
        titleEn: "COMMERCIAL CONTRACTS",
        content:
          "Redactăm și negociem contracte comerciale de toate tipurile: distribuție, agenție, franciză, comision, consignație și alte acorduri comerciale specifice. Oferim consultanță pentru minimizarea riscurilor contractuale.",
        contentEn:
          "We draft and negotiate commercial contracts of all types: distribution, agency, franchise, commission, consignment and other specific commercial agreements. We provide consulting to minimize contractual risks.",
      },
      {
        icon: ShieldCheck,
        title: "CONFORMITATE ȘI REGLEMENTARE",
        titleEn: "COMPLIANCE AND REGULATION",
        content:
          "Asistăm companiile în implementarea programelor de conformitate, în respectarea reglementărilor comerciale și în gestionarea auditurilor de conformitate. Oferim training pentru echipele interne pe teme de compliance.",
        contentEn:
          "We assist companies in implementing compliance programs, adhering to commercial regulations and managing compliance audits. We provide training for internal teams on compliance topics.",
      },
    ],
  },
  litigii: {
    id: "litigii",
    title: "Litigii și arbitraj",
    titleEn: "Litigation and Arbitration",
    description:
      "Reprezentăm clienții în litigii complexe în fața instanțelor judecătorești și a tribunalelor arbitrale, oferind strategii juridice eficiente și reprezentare de calitate superioară.",
    descriptionEn:
      "We represent clients in complex litigation before courts and arbitral tribunals, providing efficient legal strategies and superior quality representation.",
    sections: [
      {
        icon: Gavel,
        title: "LITIGII CIVILE ȘI COMERCIALE",
        titleEn: "CIVIL AND COMMERCIAL LITIGATION",
        content:
          "Reprezentăm clienții în litigii civile și comerciale complexe, incluzând dispute contractuale, răspundere civilă delictuală, recuperare de creanțe și alte conflicte patrimoniale. Oferim strategii procesuale eficiente adaptate fiecărui caz.",
        contentEn:
          "We represent clients in complex civil and commercial litigation, including contractual disputes, tort liability, debt recovery and other property conflicts. We provide efficient procedural strategies tailored to each case.",
      },
      {
        icon: Scale,
        title: "ARBITRAJ COMERCIAL",
        titleEn: "COMMERCIAL ARBITRATION",
        content:
          "Asistăm clienții în arbitraje comerciale naționale și internaționale, atât în calitate de reclamanți cât și de pârâți. Oferim consiliere în redactarea clauzelor arbitrale și în alegerea arbitrilor.",
        contentEn:
          "We assist clients in national and international commercial arbitrations, both as claimants and respondents. We provide advice in drafting arbitration clauses and selecting arbitrators.",
      },
      {
        icon: Handshake,
        title: "MEDIERE ȘI SOLUȚIONARE ALTERNATIVĂ",
        titleEn: "MEDIATION AND ALTERNATIVE DISPUTE RESOLUTION",
        content:
          "Promovăm metodele alternative de soluționare a disputelor prin mediere și negociere, oferind soluții mai rapide și mai economice decât litigiile clasice. Reprezentăm clienții în proceduri de mediere.",
        contentEn:
          "We promote alternative dispute resolution methods through mediation and negotiation, offering faster and more economical solutions than classic litigation. We represent clients in mediation procedures.",
      },
      {
        icon: Shield,
        title: "EXECUTARE SILITĂ",
        titleEn: "ENFORCEMENT",
        content:
          "Oferim asistență completă în procedurile de executare silită, reprezentând creditorii în recuperarea creanțelor sau debitorii în contestarea executării. Gestionăm executări complexe cu bunuri mobile și imobile.",
        contentEn:
          "We offer complete assistance in enforcement procedures, representing creditors in debt recovery or debtors in challenging enforcement. We manage complex enforcements involving movable and immovable property.",
      },
    ],
  },
  "drept-penal": {
    id: "drept-penal",
    title: "Drept penal",
    titleEn: "Criminal Law",
    description:
      "Oferim asistență juridică specializată în domeniul dreptului penal, reprezentând clienții în toate etapele procesului penal, de la faza de urmărire penală și investigații, până la judecată și executarea pedepselor. Asigurăm protecția drepturilor, prevenirea riscurilor penale și strategii eficiente de apărare.",
    descriptionEn:
      "We provide specialized legal assistance in criminal law, representing clients in all stages of criminal proceedings, from investigation to trial and sentence execution. We ensure rights protection, risk prevention, and effective defense strategies.",

    sections: [
      {
        icon: Shield,
        title: "APĂRARE PENALĂ",
        titleEn: "CRIMINAL DEFENSE",
        content:
          "Reprezentăm clienți în cauze penale complexe, oferind apărare în faza de urmărire penală, în fața instanțelor de judecată și în proceduri de apel sau recurs. Dezvoltăm strategii procesuale adaptate fiecărei situații, asigurând protecția maximă a drepturilor și intereselor clientului.",
        contentEn:
          "We represent clients in complex criminal cases, providing defense during criminal investigations, before trial courts, and in appeal or cassation proceedings. We develop procedural strategies tailored to each case, ensuring maximum protection of clients’ rights and interests.",
      },
      {
        icon: Briefcase,
        title: "DREPT PENAL AL AFACERILOR",
        titleEn: "BUSINESS CRIMINAL LAW",
        content:
          "Oferim asistență specializată în infracțiuni economice și financiare, inclusiv evaziune fiscală, spălare de bani, fraudă, abuz în serviciu și corupție. Reprezentăm persoane fizice și companii în investigații, audieri și procese penale, protejând interesele patrimoniale și reputația clienților.",
        contentEn:
          "We provide specialized assistance in economic and financial crimes, including tax evasion, money laundering, fraud, abuse of office, and corruption. We represent individuals and companies in investigations, hearings, and trials, protecting clients’ assets and reputation.",
      },
      {
        icon: FileText,
        title: "ASISTENȚĂ PENTRU VICTIME",
        titleEn: "VICTIM ASSISTANCE",
        content:
          "Reprezentăm victimele infracțiunilor în procesul penal, asistându-le în constituirea ca parte civilă, în obținerea despăgubirilor și în solicitarea măsurilor de protecție. Oferim consiliere și suport pe întreg parcursul procedurilor judiciare, pentru protecția drepturilor și intereselor acestora.",
        contentEn:
          "We represent crime victims in criminal proceedings, assisting them in joining as civil parties, obtaining compensation, and requesting protective measures. We provide guidance and support throughout the judicial process to safeguard their rights and interests.",
      },
      {
        icon: HelpCircle,
        title: "CONSULTANȚĂ ȘI CONFORMITATE PENALĂ",
        titleEn: "CRIMINAL COMPLIANCE AND PREVENTIVE ADVICE",
        content:
          "Consiliem companiile în implementarea programelor de conformitate penală, prevenirea riscurilor penale și gestionarea investigațiilor interne. Oferim instruire managementului și angajaților pentru reducerea expunerii la răspundere penală și respectarea legislației în vigoare.",
        contentEn:
          "We advise companies on implementing criminal compliance programs, preventing criminal risks, and managing internal investigations. We provide training for management and staff to minimize exposure to criminal liability and ensure compliance with applicable law.",
      },
      {
        icon: Users,
        title: "MEDIERE ȘI NEGOCIERE",
        titleEn: "MEDIATION AND NEGOTIATION",
        content:
          "Asistăm părțile în soluționarea amiabilă a conflictelor penale, inclusiv prin negocieri și mediere, pentru reducerea duratei proceselor și obținerea de soluții echitabile și eficiente pentru toate părțile implicate.",
        contentEn:
          "We assist parties in amicable resolution of criminal disputes, including negotiation and mediation, to reduce trial duration and achieve fair and effective solutions for all parties involved.",
      },
    ],
  },
  "drept-administrativ": {
    id: "drept-administrativ",
    title: "Drept administrativ",
    titleEn: "Administrative Law",
    description:
      "Oferim consiliere juridică în relațiile cu autoritățile publice, contestarea actelor administrative și reprezentare în contenciosul administrativ.",
    descriptionEn:
      "We offer legal advice in relations with public authorities, challenging administrative acts and representation in administrative litigation.",
    sections: [
      {
        icon: Landmark,
        title: "CONTENCIOS ADMINISTRATIV",
        titleEn: "ADMINISTRATIVE LITIGATION",
        content:
          "Reprezentăm clienții în litigii cu autoritățile publice, contestând acte administrative ilegale sau abuzive. Oferim asistență în fața instanțelor de contencios administrativ la toate nivelurile.",
        contentEn:
          "We represent clients in disputes with public authorities, challenging illegal or abusive administrative acts. We provide assistance before administrative courts at all levels.",
      },
      {
        icon: FileCheck,
        title: "AUTORIZAȚII ȘI LICENȚE",
        titleEn: "AUTHORIZATIONS AND LICENSES",
        content:
          "Asistăm clienții în obținerea autorizațiilor și licențelor necesare desfășurării activității, în relația cu autoritățile de reglementare și în contestarea refuzurilor de acordare a autorizațiilor.",
        contentEn:
          "We assist clients in obtaining necessary authorizations and licenses for business operations, in relations with regulatory authorities and in challenging refusals to grant authorizations.",
      },
      {
        icon: Globe,
        title: "ACHIZIȚII PUBLICE",
        titleEn: "PUBLIC PROCUREMENT",
        content:
          "Consiliem atât autorități contractante cât și operatori economici în procedurile de achiziție publică. Asistăm în pregătirea documentației, depunerea ofertelor și soluționarea contestațiilor.",
        contentEn:
          "We advise both contracting authorities and economic operators in public procurement procedures. We assist in preparing documentation, submitting offers and resolving appeals.",
      },
      {
        icon: ShieldCheck,
        title: "RĂSPUNDEREA STATULUI",
        titleEn: "STATE LIABILITY",
        content:
          "Reprezentăm clienții în acțiuni pentru angajarea răspunderii patrimoniale a statului pentru actele autorităților publice. Oferim asistență în obținerea de despăgubiri pentru prejudicii cauzate de administrație.",
        contentEn:
          "We represent clients in actions to engage state patrimonial liability for acts of public authorities. We provide assistance in obtaining compensation for damages caused by administration.",
      },
    ],
  },
  "proprietate-intelectuala": {
    id: "proprietate-intelectuala",
    title: "Dreptul proprietății intelectuale",
    titleEn: "Intellectual Property Law",
    description:
      "Frunză & Asociații protejează și valorifică drepturile de proprietate intelectuală ale clienților săi, oferind servicii juridice complete privind înregistrarea, apărarea și exploatarea acestora, atât pe plan național, cât și internațional. Expertiza noastră acoperă întregul spectru al drepturilor de autor, mărcilor, brevetelor, desenelor industriale și secretelor comerciale.",
    descriptionEn:
      "Frunză & Asociații protects and enforces clients’ intellectual property rights, offering comprehensive legal services for their registration, defense, and exploitation, both nationally and internationally. Our expertise covers the full spectrum of copyright, trademarks, patents, industrial designs, and trade secrets.",

    sections: [
      {
        icon: FileText,
        title: "MĂRCI, BREVETE ȘI DESENE INDUSTRIALE",
        titleEn: "TRADEMARKS, PATENTS AND INDUSTRIAL DESIGNS",
        content:
          "Echipa Frunză & Asociații oferă asistență completă în procedurile de înregistrare, opoziție, reînnoire și apărare a mărcilor, brevetelor de invenție și desenelor industriale, atât în fața Oficiului de Stat pentru Invenții și Mărci (OSIM), cât și în fața Oficiului Uniunii Europene pentru Proprietate Intelectuală (EUIPO) și a Organizației Mondiale a Proprietății Intelectuale (OMPI). De asemenea, oferim consiliere strategică privind administrarea portofoliilor de drepturi IP și prevenirea conflictelor de marcă.",
        contentEn:
          "The Frunză & Asociații team provides comprehensive assistance in the registration, opposition, renewal, and defense of trademarks, patents, and industrial designs before the Romanian State Office for Inventions and Trademarks (OSIM), the European Union Intellectual Property Office (EUIPO), and the World Intellectual Property Organization (WIPO). We also offer strategic advice on managing IP portfolios and preventing trademark conflicts.",
      },

      {
        icon: Shield,
        title: "DREPTURI DE AUTOR ȘI DREPTURI CONEXE",
        titleEn: "COPYRIGHT AND RELATED RIGHTS",
        content:
          "Oferim consultanță și reprezentare în domeniul drepturilor de autor și al drepturilor conexe, acoperind toate etapele – de la protejarea creațiilor originale (literare, artistice, software, muzicale, audio-vizuale) până la exploatarea acestora prin contracte de cesiune, licență sau distribuție. Asigurăm redactarea și negocierea contractelor, precum și apărarea în fața instanțelor și autorităților competente în cazurile de încălcare a drepturilor de autor.",
        contentEn:
          "We provide legal advice and representation in the field of copyright and related rights, covering all stages – from protecting original works (literary, artistic, software, musical, audiovisual) to their exploitation through assignment, licensing, or distribution contracts. We ensure the drafting and negotiation of agreements and defend clients before courts and competent authorities in copyright infringement cases.",
      },

      {
        icon: Gavel,
        title: "LITIGII DE PROPRIETATE INTELECTUALĂ",
        titleEn: "INTELLECTUAL PROPERTY LITIGATION",
        content:
          "Avocații Frunză & Asociații reprezintă clienții în litigii complexe de proprietate intelectuală, incluzând acțiuni de contrafacere, concurență neloială, încălcare de marcă, brevet sau drepturi de autor. Elaborăm strategii de protecție și apărare adaptate fiecărei situații, urmărind obținerea unor soluții rapide și eficiente, inclusiv măsuri provizorii, confiscarea produselor contrafăcute și despăgubiri pentru prejudiciile suferite.",
        contentEn:
          "Frunză & Asociații attorneys represent clients in complex intellectual property disputes, including counterfeiting, unfair competition, trademark, patent, and copyright infringement actions. We develop tailored protection and defense strategies, aiming to secure swift and effective remedies such as provisional measures, seizure of counterfeit goods, and compensation for damages.",
      },

      {
        icon: FileCheck,
        title: "LICENȚIERE, FRANCIZE ȘI TRANSFER DE TEHNOLOGIE",
        titleEn: "LICENSING, FRANCHISING AND TECHNOLOGY TRANSFER",
        content:
          "Oferim consultanță juridică specializată în negocierea, redactarea și implementarea contractelor de licență, franciză, transfer de tehnologie, cesiune de know-how și acorduri de confidențialitate. Asigurăm protejarea intereselor clienților în tranzacții IP complexe, inclusiv în cadrul parteneriatelor comerciale, fuziunilor și achizițiilor, sau proiectelor de cercetare-dezvoltare.",
        contentEn:
          "We provide specialized legal advice on negotiating, drafting, and implementing licensing, franchising, technology transfer, know-how assignment, and confidentiality agreements. We ensure the protection of our clients’ interests in complex IP transactions, including within commercial partnerships, mergers and acquisitions, and research and development projects.",
      },
    ],
  },
  "drept-societar": {
    id: "drept-societar",
    title: "Drept societar",
    titleEn: "Corporate Law",
    description:
      "Frunză & Asociații oferă servicii juridice integrate pentru societăți comerciale, acoperind toate aspectele legale ale constituirii, funcționării, reorganizării și lichidării companiilor. Expertiza noastră vizează prevenirea riscurilor juridice și optimizarea structurii corporative pentru atingerea obiectivelor de afaceri ale clienților.",
    descriptionEn:
      "Frunză & Asociații provides comprehensive legal services for commercial companies, covering all legal aspects of company formation, operation, restructuring, and liquidation. Our expertise focuses on mitigating legal risks and optimizing corporate structures to achieve clients’ business objectives.",

    sections: [
      {
        icon: Briefcase,
        title: "ÎNFIINȚARE ȘI ORGANIZARE SOCIETĂȚI",
        titleEn: "COMPANY FORMATION AND ORGANIZATION",
        content:
          "Asistăm clienții în constituirea societăților comerciale, selectarea formei juridice adecvate (SRL, SA, PFA, SNC, SCS etc.), redactarea actelor constitutive și a regulamentelor interne, precum și în organizarea structurilor interne de guvernanță. De asemenea, oferim consultanță privind modificările ulterioare ale actelor constitutive, majorări de capital, cesiuni de părți sociale și reorganizări ale structurii acționariatului.",
        contentEn:
          "We assist clients in establishing commercial companies, selecting the appropriate legal form (LLC, Joint Stock Company, Sole Proprietorship, General or Limited Partnership, etc.), drafting founding documents and internal regulations, and organizing internal governance structures. We also provide guidance on subsequent amendments to founding documents, capital increases, share transfers, and shareholder structure reorganizations.",
      },
      {
        icon: FileText,
        title: "CONTRACTE ȘI TRANZACȚII COMERCIALE",
        titleEn: "COMMERCIAL CONTRACTS AND TRANSACTIONS",
        content:
          "Redactăm, analizăm și negociem contracte comerciale complexe, inclusiv contracte de furnizare, distribuție, franciză, asociere în participațiune, parteneriate strategice, fuziuni și achiziții. Ne asigurăm că fiecare contract respectă principiile de echitate și legalitate, protejând interesele juridice și comerciale ale clienților în toate etapele tranzacției.",
        contentEn:
          "We draft, review, and negotiate complex commercial contracts, including supply, distribution, franchise, joint-venture, strategic partnership, mergers, and acquisitions agreements. We ensure that each contract adheres to principles of fairness and legality, safeguarding clients’ legal and commercial interests at every stage of the transaction.",
      },
      {
        icon: Shield,
        title: "GUVERNANȚĂ CORPORATIVĂ ȘI CONFORMITATE",
        titleEn: "CORPORATE GOVERNANCE AND COMPLIANCE",
        content:
          "Oferim consultanță juridică privind guvernanța corporativă, elaborarea și implementarea politicilor interne, respectarea legislației societare, fiscale și de protecție a datelor, precum și prevenirea riscurilor de neconformitate. De asemenea, asistăm companiile în audituri juridice (due diligence) și în implementarea măsurilor corective necesare.",
        contentEn:
          "We provide legal advice on corporate governance, drafting and implementing internal policies, compliance with corporate, tax, and data protection laws, and preventing non-compliance risks. We also assist companies in legal audits (due diligence) and in implementing necessary corrective measures.",
      },
      {
        icon: HelpCircle,
        title: "RESTRUCTURĂRI, FUZIUNI ȘI DIZOLVĂRI",
        titleEn: "RESTRUCTURING, MERGERS AND DISSOLUTIONS",
        content:
          "Asistăm societățile în procese de reorganizare, fuziuni, divizări, transformări, dizolvări și lichidări, gestionând toate aspectele juridice, fiscale și administrative. Elaborăm strategii personalizate pentru optimizarea structurii corporative, prevenirea litigiilor și protejarea intereselor comerciale ale clienților.",
        contentEn:
          "We assist companies in restructuring, mergers, demergers, transformations, dissolutions, and liquidations, managing all legal, tax, and administrative aspects. We develop tailored strategies to optimize corporate structure, prevent disputes, and protect clients’ commercial interests.",
      },
    ],
  },
  "restructurare-recuperare": {
    id: "restructurare-recuperare",
    title: "Restructurare și recuperare creanțe",
    titleEn: "Debt Restructuring & Recovery",
    description:
      "Frunză & Asociații oferă asistență juridică specializată în restructurarea datoriilor și recuperarea creanțelor comerciale și financiare, protejând interesele clienților prin strategii eficiente și soluții adaptate contextului fiecărei afaceri.",
    descriptionEn:
      "Frunză & Asociații provides specialized legal assistance in debt restructuring and commercial and financial debt recovery, protecting clients’ interests through efficient strategies and tailored solutions for each business context.",

    sections: [
      {
        icon: Briefcase,
        title: "RESTRUCTURARE DATORII",
        titleEn: "DEBT RESTRUCTURING",
        content:
          "Asistăm companiile în identificarea și negocierea cu creditorii, elaborarea și implementarea planurilor de restructurare a datoriilor, inclusiv refinanțări, conversii de datorii și reechilibrarea obligațiilor financiare. Oferim strategii personalizate pentru stabilizarea situației financiare și menținerea continuității activității companiei.",
        contentEn:
          "We assist companies in identifying and negotiating with creditors, developing and implementing debt restructuring plans, including refinancing, debt conversions, and rebalancing financial obligations. We provide tailored strategies to stabilize financial positions and ensure business continuity.",
      },
      {
        icon: FileText,
        title: "RECUPERARE CREANȚE",
        titleEn: "DEBT COLLECTION",
        content:
          "Oferim servicii complete de recuperare a creanțelor comerciale și financiare, incluzând notificări, negocieri directe, mediere, acțiuni judiciare și executări silite. Ne concentrăm pe maximizarea recuperării sumelor datorate, protejând în același timp relațiile comerciale ale clientului.",
        contentEn:
          "We provide comprehensive services for commercial and financial debt recovery, including notices, direct negotiations, mediation, legal actions, and enforcement proceedings. We focus on maximizing the recovery of owed amounts while protecting clients’ business relationships.",
      },
      {
        icon: Shield,
        title: "CONSULTANȚĂ PREVENTIVĂ",
        titleEn: "PREVENTIVE CONSULTING",
        content:
          "Consiliem clienții în identificarea și prevenirea riscurilor de neplată și insolvență, analizând contractele, relațiile comerciale și fluxurile financiare. Recomandăm măsuri proactive pentru protejarea numerarului, a creanțelor și a activelor companiei.",
        contentEn:
          "We advise clients on identifying and preventing non-payment and insolvency risks by analyzing contracts, commercial relationships, and financial flows. We recommend proactive measures to protect cash flow, receivables, and company assets.",
      },
      {
        icon: HelpCircle,
        title: "INSOLVENȚĂ, FALIMENT ȘI LICHIDARE",
        titleEn: "INSOLVENCY, BANKRUPTCY AND LIQUIDATION",
        content:
          "Asistăm companiile și creditorii în proceduri complexe de insolvență, faliment sau lichidare, oferind consultanță juridică strategică pentru maximizarea recuperării creanțelor și optimizarea procedurilor legale. Reprezentăm clienții în fața instanțelor și autorităților competente, gestionând toate aspectele juridice și procedurale.",
        contentEn:
          "We assist companies and creditors in complex insolvency, bankruptcy, or liquidation proceedings, providing strategic legal advice to maximize debt recovery and optimize legal procedures. We represent clients before courts and competent authorities, managing all legal and procedural aspects.",
      },
    ],
  },
  insolventa: {
    id: "insolventa",
    title: "Insolvență",
    titleEn: "Insolvency",
    description:
      "Frunză & Asociații oferă asistență juridică completă în toate etapele procedurilor de insolvență, protejând interesele companiilor și ale creditorilor, prin strategii eficiente de redresare și recuperare a creanțelor.",
    descriptionEn:
      "Frunză & Asociații provides comprehensive legal assistance at all stages of insolvency proceedings, protecting the interests of companies and creditors through effective recovery and restructuring strategies.",

    sections: [
      {
        icon: Briefcase,
        title: "CONSULTANȚĂ ÎN INSOLVENȚĂ",
        titleEn: "INSOLVENCY CONSULTING",
        content:
          "Oferim consultanță strategică pentru prevenirea insolvenței și gestionarea situațiilor financiare critice, incluzând analiza riscurilor, evaluarea capacității de plată și recomandări pentru redresarea activității companiei. Scopul este minimizarea impactului financiar și protejarea intereselor stakeholderilor.",
        contentEn:
          "We provide strategic consulting for insolvency prevention and management of critical financial situations, including risk analysis, assessment of payment capacity, and recommendations for business recovery. The goal is to minimize financial impact and protect stakeholders’ interests.",
      },
      {
        icon: FileText,
        title: "REORGANIZARE ȘI PLAN DE REDRESARE",
        titleEn: "REORGANIZATION AND RECOVERY PLAN",
        content:
          "Asistăm companiile în elaborarea și implementarea planurilor de reorganizare, restructurare financiară și redresare, inclusiv negocieri cu creditorii, refinanțări și optimizarea structurii financiare. Obiectivul este menținerea continuității activității și evitarea falimentului.",
        contentEn:
          "We assist companies in drafting and implementing reorganization, financial restructuring, and recovery plans, including negotiations with creditors, refinancing, and optimizing financial structures. The objective is to maintain business continuity and avoid bankruptcy.",
      },
      {
        icon: Shield,
        title: "REPREZENTARE CREDITORI",
        titleEn: "CREDITOR REPRESENTATION",
        content:
          "Reprezentăm creditorii în procedurile de insolvență, asigurând protecția drepturilor acestora, participând activ la întocmirea și negocierea planurilor de plată, monitorizarea activelor și toate demersurile procedurale necesare pentru recuperarea creanțelor.",
        contentEn:
          "We represent creditors in insolvency proceedings, ensuring protection of their rights, actively participating in drafting and negotiating payment plans, monitoring assets, and handling all procedural steps necessary for debt recovery.",
      },
      {
        icon: HelpCircle,
        title: "FALIMENT ȘI LICHIDARE",
        titleEn: "BANKRUPTCY AND LIQUIDATION",
        content:
          "Oferim asistență juridică completă în procedurile de faliment și lichidare, pentru companii sau creditori, gestionând toate formalitățile legale, strategiile de valorificare a activelor și procedurile de distribuire către creditori, asigurând recuperarea maximă posibilă.",
        contentEn:
          "We provide full legal assistance in bankruptcy and liquidation proceedings for companies or creditors, managing all legal formalities, asset realization strategies, and distribution procedures to creditors, ensuring maximum possible recovery.",
      },
    ],
  },

  "arbitraj-executare": {
    id: "arbitraj-executare",
    title: "Arbitraj intern și internațional, Proceduri de executare silită",
    titleEn: "Domestic and International Arbitration, Enforcement Procedures",
    description:
      "Frunză & Asociații oferă consultanță și reprezentare juridică specializată în arbitraj comercial și proceduri de executare silită, protejând drepturile și interesele clienților în litigii complexe și tranzacții comerciale. Echipa noastră asigură asistență în toate etapele procesului arbitral și al executării silite, elaborând strategii eficiente pentru soluționarea rapidă și sigură a litigiilor.",
    descriptionEn:
      "Frunză & Asociații provides specialized legal advisory and representation in commercial arbitration and enforcement procedures, safeguarding clients’ rights and interests in complex disputes and commercial transactions. Our team provides support at all stages of arbitration and enforcement, developing effective strategies for timely and secure dispute resolution.",

    sections: [
      {
        icon: Shield,
        title: "ARBITRAJ INTERN ȘI INTERNAȚIONAL",
        titleEn: "DOMESTIC AND INTERNATIONAL ARBITRATION",
        content:
          "Asistăm clienții în arbitraje comerciale interne și internaționale, gestionând proceduri complexe și multiple aspecte juridice, inclusiv alegerea instituției arbitrale, redactarea convențiilor arbitrale, selecția arbitrilor și administrarea procedurilor de audiere. Oferim strategii personalizate pentru minimizarea riscurilor, accelerarea procesului și protejarea intereselor economice și reputaționale ale clienților.",
        contentEn:
          "We assist clients in domestic and international commercial arbitration, managing complex proceedings and multiple legal aspects, including selection of arbitral institutions, drafting arbitration agreements, appointing arbitrators, and managing hearing procedures. We provide tailored strategies to minimize risks, expedite proceedings, and safeguard clients’ economic interests and reputation.",
      },
      {
        icon: FileText,
        title: "PREGĂTIREA ȘI REDACTAREA CONVENȚIILOR ARBITRALE",
        titleEn: "ARBITRATION AGREEMENT DRAFTING AND REVIEW",
        content:
          "Oferim consiliere specializată privind redactarea și revizuirea convențiilor arbitrale, inclusiv definirea clauzelor de competență, alegerea legii aplicabile, mecanisme de soluționare a disputelor și proceduri de mediere sau conciliere. Asigurăm protecția maximă a intereselor clienților în cadrul contractelor comerciale internaționale și interne.",
        contentEn:
          "We provide specialized advice on drafting and reviewing arbitration agreements, including defining jurisdiction clauses, choosing applicable law, dispute resolution mechanisms, and mediation or conciliation procedures. We ensure maximum protection of clients’ interests in domestic and international commercial contracts.",
      },
      {
        icon: Users,
        title: "GESTIONAREA PROBEI ȘI REPREZENTAREA CLIENTULUI",
        titleEn: "EVIDENCE MANAGEMENT AND CLIENT REPRESENTATION",
        content:
          "Asigurăm reprezentarea completă a clienților în fața tribunalelor arbitrale, administrăm probele, întocmim memoriile și pledoariile, și coordonăm depozițiile martorilor. Experiența noastră în arbitraje complexe permite protejarea intereselor clienților și maximizarea șanselor de succes.",
        contentEn:
          "We provide full client representation before arbitral tribunals, manage evidence, draft submissions and pleadings, and coordinate witness depositions. Our experience in complex arbitrations ensures protection of clients’ interests and maximizes the chances of success.",
      },
      {
        icon: Handshake,
        title: "NEGOCIERE ȘI SOLUȚIONARE AMIABILĂ",
        titleEn: "NEGOTIATION AND AMICABLE SETTLEMENT",
        content:
          "Oferim consultanță și mediere în vederea soluționării amiabile a disputelor, atât înainte de inițierea procedurilor arbitrale, cât și pe parcursul acestora. Scopul este reducerea duratei proceselor și menținerea relațiilor comerciale între părți.",
        contentEn:
          "We provide advisory and mediation services aimed at amicable dispute resolution, both prior to arbitration proceedings and during them. The goal is to reduce the duration of proceedings and maintain commercial relationships between parties.",
      },
      {
        icon: FileCheck,
        title: "PROCEDURI DE EXECUTARE SILITĂ",
        titleEn: "ENFORCEMENT PROCEDURES",
        content:
          "Oferim asistență completă în executarea silită a creanțelor comerciale, incluzând notificări prealabile, coordonarea cu executorii judecătorești, monitorizarea procedurilor de valorificare a bunurilor și reprezentarea clienților în fața instanțelor. Dezvoltăm strategii personalizate pentru recuperarea rapidă și eficientă a sumelor datorate.",
        contentEn:
          "We provide comprehensive assistance in enforcement of commercial debts, including pre-enforcement notices, coordination with bailiffs, monitoring asset realization procedures, and client representation before courts. We develop tailored strategies for prompt and efficient debt recovery.",
      },
      {
        icon: Globe,
        title: "RECUPERAREA TRANSFRONTALIERĂ A CREANȚELOR",
        titleEn: "CROSS-BORDER DEBT RECOVERY",
        content:
          "Asistăm clienții în proceduri de recuperare a creanțelor transfrontaliere, incluzând recunoașterea și executarea hotărârilor străine, colaborarea cu autoritățile judiciare internaționale și adaptarea strategiilor la legislația specifică fiecărui stat implicat.",
        contentEn:
          "We assist clients in cross-border debt recovery procedures, including recognition and enforcement of foreign judgments, cooperation with international judicial authorities, and adapting strategies to the specific laws of each jurisdiction involved.",
      },
      {
        icon: HelpCircle,
        title: "CONSILIERE STRATEGICĂ ȘI RISC MANAGEMENT",
        titleEn: "STRATEGIC ADVICE AND RISK MANAGEMENT",
        content:
          "Oferim consultanță strategică pentru evaluarea riscurilor juridice și financiare, prevenirea litigiilor și optimizarea proceselor de arbitraj și executare. Echipa noastră ajută clienții să ia decizii informate, protejându-le interesele pe termen lung.",
        contentEn:
          "We provide strategic advice for assessing legal and financial risks, preventing disputes, and optimizing arbitration and enforcement processes. Our team helps clients make informed decisions, safeguarding their long-term interests.",
      },
    ],
  },
  "drept-financiar": {
    id: "drept-financiar",
    title: "Drept bancar, asigurări, piața de capital și finanțare",
    titleEn: "Banking, Insurance, Capital Markets & Finance",
    description:
      "Frunză & Asociații oferă consultanță juridică specializată în domeniul financiar, asistând clienți în domeniul bancar, al asigurărilor, pieței de capital și al finanțării afacerilor, prin strategii adaptate și respectarea strictă a cadrului legal.",
    descriptionEn:
      "Frunză & Asociații provides specialized legal advisory services in the financial sector, assisting clients in banking, insurance, capital markets, and business financing with tailored strategies and strict compliance with legal frameworks.",

    sections: [
      {
        icon: Briefcase,
        title: "DREPT BANCAR",
        titleEn: "BANKING LAW",
        content:
          "Oferim asistență completă în domeniul bancar, inclusiv consultanță privind contracte de credit, leasing, garanții și alte instrumente financiare, negocierea și redactarea acestora, precum și reprezentarea clienților în relațiile cu instituțiile financiare și autoritățile de reglementare.",
        contentEn:
          "We provide comprehensive legal assistance in banking, including advisory on loan, leasing, guarantees, and other financial instruments, their negotiation and drafting, as well as representation of clients in dealings with financial institutions and regulatory authorities.",
      },
      {
        icon: Shield,
        title: "ASIGURĂRI",
        titleEn: "INSURANCE LAW",
        content:
          "Asistăm clienții în domeniul asigurărilor, inclusiv redactarea și negocierea contractelor de asigurare, gestionarea litigiilor cu societăți de asigurări și implementarea strategiilor de management al riscurilor pentru persoane fizice și juridice.",
        contentEn:
          "We assist clients in insurance matters, including drafting and negotiating insurance contracts, managing disputes with insurance companies, and implementing risk management strategies for individuals and businesses.",
      },
      {
        icon: FileText,
        title: "PIAȚA DE CAPITAL",
        titleEn: "CAPITAL MARKETS",
        content:
          "Oferim consultanță juridică în tranzacții pe piața de capital, inclusiv emisiuni de valori mobiliare, oferte publice inițiale (IPO), fuziuni și achiziții, asigurând conformitatea cu legislația aplicabilă și reglementările autorităților competente.",
        contentEn:
          "We provide legal advisory services in capital markets transactions, including securities issuance, initial public offerings (IPOs), mergers, and acquisitions, ensuring compliance with applicable laws and regulatory authorities.",
      },
      {
        icon: HelpCircle,
        title: "FINANȚARE ȘI INVESTIȚII",
        titleEn: "FINANCING AND INVESTMENTS",
        content:
          "Asistăm clienții în proiecte de finanțare și investiții, inclusiv contracte de investiții, proiecte de infrastructură și instrumente financiare complexe, cu scopul de a optimiza structura financiară și strategia de business a companiei.",
        contentEn:
          "We assist clients in financing and investment projects, including investment contracts, infrastructure projects, and complex financial instruments, aiming to optimize the financial structure and business strategy of the company.",
      },
    ],
  },
  "drept-administrativ-fiscal": {
    id: "drept-administrativ-fiscal",
    title: "Drept administrativ, fiscal și contencios constituțional",
    titleEn: "Administrative, Fiscal and Constitutional Litigation",
    description:
      "Frunză & Asociații oferă consultanță și reprezentare juridică specializată în domeniul dreptului administrativ, fiscal și contencios constituțional. Asigurăm protecția intereselor clienților în relația cu autoritățile publice, optimizarea obligațiilor fiscale și respectarea drepturilor fundamentale în fața instanțelor și autorităților competente.",
    descriptionEn:
      "Frunză & Asociații provides specialized legal advisory and representation in administrative, fiscal, and constitutional litigation matters. We safeguard clients’ interests in dealings with public authorities, optimize fiscal obligations, and ensure protection of fundamental rights before courts and competent authorities.",

    sections: [
      {
        icon: Briefcase,
        title: "DREPT ADMINISTRATIV",
        titleEn: "ADMINISTRATIVE LAW",
        content:
          "Asistăm clienții în relația cu autoritățile publice și instituțiile administrației centrale și locale, în obținerea autorizațiilor, avizelor și licențelor, precum și în soluționarea litigiilor administrative. Oferim consultanță privind respectarea reglementărilor administrative, procedurile de contestare a deciziilor și negocierea soluțiilor amiabile cu autoritățile.",
        contentEn:
          "We assist clients in dealing with public authorities and local or central administrative institutions, obtaining permits, approvals, and licenses, as well as resolving administrative disputes. We provide advice on compliance with administrative regulations, procedures for contesting decisions, and negotiating amicable solutions with authorities.",
      },
      {
        icon: FileText,
        title: "DREPT FISCAL",
        titleEn: "FISCAL LAW",
        content:
          "Oferim consultanță fiscală complexă, inclusiv planificare și optimizare fiscală, interpretarea legislației în vigoare și reprezentarea clienților în fața autorităților fiscale. Gestionăm contestații, soluționăm litigii fiscale și asistăm în verificări și controale, pentru protejarea intereselor financiare și respectarea obligațiilor legale.",
        contentEn:
          "We provide comprehensive tax advisory, including tax planning and optimization, interpretation of applicable legislation, and client representation before tax authorities. We handle appeals, resolve tax disputes, and assist in audits and inspections to safeguard financial interests and ensure compliance.",
      },
      {
        icon: Shield,
        title: "CONTENCIOS CONSTITUȚIONAL",
        titleEn: "CONSTITUTIONAL LITIGATION",
        content:
          "Reprezentăm clienții în proceduri de contencios constituțional, protejând drepturile fundamentale și libertățile civile, precum și respectarea principiilor constituționale. Oferim consiliere privind accesul la instanțele constituționale și pregătirea strategiilor pentru atacarea actelor normative sau deciziilor administrative nelegale.",
        contentEn:
          "We represent clients in constitutional litigation proceedings, safeguarding fundamental rights and civil liberties, as well as ensuring compliance with constitutional principles. We provide advice on access to constitutional courts and prepare strategies for challenging unlawful normative acts or administrative decisions.",
      },
      {
        icon: Users,
        title: "REPREZENTARE ÎN FAȚA AUTORITĂȚILOR ȘI INSTITUȚIILOR",
        titleEn: "REPRESENTATION BEFORE AUTHORITIES AND INSTITUTIONS",
        content:
          "Asistăm clienții în interacțiunea cu autorități publice, organisme de control și instituții administrative, inclusiv participarea la audieri, redactarea memoriilor și obținerea soluțiilor favorabile prin mijloace legale și procedurale adecvate.",
        contentEn:
          "We assist clients in interactions with public authorities, control bodies, and administrative institutions, including attending hearings, drafting submissions, and securing favorable outcomes through appropriate legal and procedural means.",
      },
      {
        icon: FileCheck,
        title: "CONSILIERE ȘI PLANIFICARE FISCALĂ PREVENTIVĂ",
        titleEn: "PREVENTIVE TAX ADVICE AND PLANNING",
        content:
          "Oferim consultanță preventivă pentru identificarea riscurilor fiscale, planificarea obligațiilor și optimizarea structurii financiare a companiilor și persoanelor fizice. Scopul este prevenirea disputelor fiscale și minimizarea riscului de sancțiuni.",
        contentEn:
          "We provide preventive advisory to identify tax risks, plan obligations, and optimize the financial structure of companies and individuals. The goal is to prevent tax disputes and minimize the risk of penalties.",
      },
      {
        icon: HelpCircle,
        title: "STRATEGII DE LITIGIU ȘI SOLUȚIONARE AMIABILĂ",
        titleEn: "LITIGATION STRATEGY AND AMICABLE RESOLUTION",
        content:
          "Elaborăm strategii juridice personalizate pentru soluționarea litigiilor administrative și fiscale, inclusiv prin negocieri și mediere. Obiectivul este protejarea intereselor clienților și reducerea duratei și costurilor procedurilor legale.",
        contentEn:
          "We develop tailored legal strategies for resolving administrative and fiscal disputes, including negotiation and mediation. The objective is to protect clients’ interests and reduce the duration and costs of legal proceedings.",
      },
    ],
  },

  "drept-concurenta-ajutor": {
    id: "drept-concurenta-ajutor",
    title: "Dreptul concurenței și ajutor de stat",
    titleEn: "Competition Law and State Aid",
    description:
      "Frunză & Asociații oferă consultanță și reprezentare specializată în domeniul dreptului concurenței și al ajutorului de stat, asistând clienții în prevenirea practicilor anticoncurențiale, conformitatea cu legislația europeană și națională și soluționarea disputelor cu autoritățile de reglementare.",
    descriptionEn:
      "Frunză & Asociații provides specialized advice and representation in competition law and state aid, assisting clients in preventing anti-competitive practices, ensuring compliance with EU and national legislation, and resolving disputes with regulatory authorities.",

    sections: [
      {
        icon: Shield,
        title: "LEGISLAȚIE CONCURENȚIALĂ",
        titleEn: "COMPETITION LAW",
        content:
          "Oferim consultanță privind respectarea legislației naționale și europene în domeniul concurenței, identificarea practicilor anticoncurențiale și evaluarea riscurilor legale în tranzacții și comportamente comerciale.",
        contentEn:
          "We provide advice on compliance with national and EU competition law, identifying anti-competitive practices and assessing legal risks in transactions and commercial behavior.",
      },
      {
        icon: Briefcase,
        title: "AJUTOR DE STAT",
        titleEn: "STATE AID",
        content:
          "Asistăm clienții în respectarea reglementărilor privind ajutorul de stat, analizăm eligibilitatea programelor și acordăm suport în obținerea autorizațiilor, notificărilor și aprobărilor necesare din partea autorităților competente.",
        contentEn:
          "We assist clients in complying with state aid regulations, analyze program eligibility, and provide support in obtaining authorizations, notifications, and approvals from competent authorities.",
      },
      {
        icon: FileText,
        title: "CONTENCIOS CONCURENȚIAL",
        titleEn: "COMPETITION DISPUTES",
        content:
          "Reprezentăm clienții în litigii privind practicile anticoncurențiale, inclusiv abuz de poziție dominantă, carteluri, fixarea prețurilor și restricții de piață, oferind strategii eficiente de apărare și recuperare.",
        contentEn:
          "We represent clients in disputes regarding anti-competitive practices, including abuse of dominant position, cartels, price fixing, and market restrictions, providing effective defense and recovery strategies.",
      },
      {
        icon: Users,
        title: "CONSILIERE ÎN TRANZACȚII",
        titleEn: "MERGERS & ACQUISITIONS COMPLIANCE",
        content:
          "Oferim consultanță privind aspectele concurențiale ale fuziunilor și achizițiilor, analizăm impactul asupra pieței și pregătim notificările necesare către autoritățile de concurență.",
        contentEn:
          "We provide advice on competition aspects of mergers and acquisitions, analyze market impact, and prepare necessary notifications to competition authorities.",
      },
      {
        icon: HelpCircle,
        title: "PREVENIREA RISCURILOR ANTICONCURENȚIALE",
        titleEn: "ANTI-COMPETITIVE RISK PREVENTION",
        content:
          "Consiliem clienții pentru identificarea și prevenirea riscurilor anticoncurențiale în cadrul politicilor interne, strategiilor comerciale și contractelor, protejând astfel interesele companiei.",
        contentEn:
          "We advise clients to identify and prevent anti-competitive risks in internal policies, commercial strategies, and contracts, thereby safeguarding company interests.",
      },
      {
        icon: FileCheck,
        title: "REPREZENTARE ÎN FAȚA AUTORITĂȚILOR",
        titleEn: "REPRESENTATION BEFORE AUTHORITIES",
        content:
          "Reprezentăm clienții în fața autorităților de concurență și de control al ajutorului de stat, inclusiv în proceduri de investigație, inspecții și negocieri pentru soluționarea amiabilă sau contestarea sancțiunilor.",
        contentEn:
          "We represent clients before competition and state aid authorities, including investigations, inspections, and negotiations for amicable resolution or challenging sanctions.",
      },
    ],
  },
  "drept-munca": {
    id: "drept-munca",
    title: "Dreptul muncii și al securității sociale",
    titleEn: "Labor and Social Security Law",
    description:
      "Frunză & Asociații oferă consultanță și reprezentare juridică specializată în domeniul dreptului muncii și al securității sociale, protejând interesele angajatorilor și ale angajaților în toate etapele relațiilor de muncă și în fața autorităților competente.",
    descriptionEn:
      "Frunză & Asociații provides specialized legal advice and representation in labor and social security law, protecting the interests of employers and employees at all stages of employment relations and before competent authorities.",

    sections: [
      {
        icon: Briefcase,
        title: "RELATII DE MUNCĂ",
        titleEn: "LABOR RELATIONS",
        content:
          "Oferim consultanță în redactarea și revizuirea contractelor individuale și colective de muncă, negocieri colective, politici interne, proceduri disciplinare și litigii de muncă. Asistăm angajatorii și angajații în interpretarea și aplicarea corectă a legislației muncii.",
        contentEn:
          "We provide advice on drafting and reviewing individual and collective employment contracts, collective bargaining, internal policies, disciplinary procedures, and labor disputes. We assist employers and employees in correctly interpreting and applying labor law.",
      },
      {
        icon: Shield,
        title: "SECURITATE SOCIALĂ",
        titleEn: "SOCIAL SECURITY",
        content:
          "Consiliem clienții privind contribuțiile sociale, drepturile și beneficiile de pensie, indemnizațiile și alte forme de protecție socială. Reprezentăm angajatorii și angajații în fața instituțiilor de control și autorităților competente în domeniul securității sociale.",
        contentEn:
          "We advise clients on social contributions, pension rights and benefits, allowances, and other social protection measures. We represent employers and employees before regulatory authorities and control institutions in the field of social security.",
      },
      {
        icon: Users,
        title: "LITIGII ȘI CONFLICTE DE MUNCĂ",
        titleEn: "LABOR DISPUTES AND LITIGATION",
        content:
          "Reprezentăm clienții în litigii individuale și colective, revendicări salariale, concedieri, discriminare la locul de muncă, conflicte de muncă și orice altă dispută apărută în relațiile de muncă.",
        contentEn:
          "We represent clients in individual and collective disputes, wage claims, dismissals, workplace discrimination, labor conflicts, and any other dispute arising from employment relations.",
      },
      {
        icon: FileText,
        title: "CONSILIERE PENTRU POLITICI INTERNE",
        titleEn: "INTERNAL POLICIES ADVISORY",
        content:
          "Oferim consultanță în elaborarea și implementarea regulamentelor interne, procedurilor disciplinare și politicilor de sănătate și securitate în muncă, pentru asigurarea conformității cu legislația muncii.",
        contentEn:
          "We provide advice on drafting and implementing internal regulations, disciplinary procedures, and health and safety policies, ensuring compliance with labor law.",
      },
      {
        icon: HelpCircle,
        title: "PREVENIREA RISCURILOR ȘI CONFORMITATE",
        titleEn: "RISK PREVENTION AND COMPLIANCE",
        content:
          "Asistăm angajatorii și angajații în prevenirea litigiilor de muncă și a sancțiunilor legale prin audit intern, instruire și monitorizarea respectării legislației muncii și a regulilor de securitate socială.",
        contentEn:
          "We assist employers and employees in preventing labor disputes and legal penalties through internal audits, training, and monitoring compliance with labor law and social security regulations.",
      },
    ],
  },

  "protectia-consumatorului": {
    id: "protectia-consumatorului",
    title: "Protecția consumatorului",
    titleEn: "Consumer Protection",
    description:
      "Frunză & Asociații oferă consultanță și reprezentare juridică specializată în protecția drepturilor consumatorilor, asigurând respectarea legislației și soluționarea eficientă a litigiilor cu comercianții sau prestatorii de servicii.",
    descriptionEn:
      "Frunză & Asociații provides specialized legal advice and representation in consumer protection, ensuring compliance with applicable law and efficient resolution of disputes with merchants or service providers.",

    sections: [
      {
        icon: Shield,
        title: "CONSULTANȚĂ ȘI RECLAMAȚII",
        titleEn: "CONSULTING AND COMPLAINTS",
        content:
          "Oferim asistență consumatorilor în analiza și formularea reclamațiilor, contestarea practicilor comerciale incorecte, publicitate înșelătoare, clauze abuzive și încălcări ale drepturilor contractuale sau legale.",
        contentEn:
          "We assist consumers in analyzing and submitting complaints, challenging unfair commercial practices, misleading advertising, abusive clauses, and violations of contractual or legal rights.",
      },
      {
        icon: FileText,
        title: "REPREZENTARE ÎN LITIGII",
        titleEn: "LITIGATION REPRESENTATION",
        content:
          "Reprezentăm clienții în proceduri civile și administrative, inclusiv în fața autorităților de protecție a consumatorului, instanțelor de judecată și în arbitraje, pentru a asigura respectarea drepturilor și obținerea despăgubirilor corespunzătoare.",
        contentEn:
          "We represent clients in civil and administrative proceedings, including before consumer protection authorities, courts, and arbitration, ensuring rights are upheld and appropriate remedies obtained.",
      },
      {
        icon: Users,
        title: "CONSILIERE PENTRU PREVENIREA LITIGIILOR",
        titleEn: "DISPUTE PREVENTION ADVISORY",
        content:
          "Oferim consultanță preventivă consumatorilor și comercianților, instruire privind drepturile și obligațiile legale, redactarea și verificarea contractelor, pentru a minimiza riscurile de litigiu.",
        contentEn:
          "We provide preventive advice to consumers and merchants, training on legal rights and obligations, drafting and reviewing contracts, to minimize the risk of disputes.",
      },
      {
        icon: HelpCircle,
        title: "MEDIERE ȘI SOLUȚIONARE ALTERNATIVĂ",
        titleEn: "MEDIATION AND ALTERNATIVE DISPUTE RESOLUTION",
        content:
          "Asistăm clienții în soluționarea amiabilă a conflictelor cu comercianții sau prestatorii de servicii, prin mediere, negocieri și alternative legale eficiente pentru evitarea litigiilor de lungă durată.",
        contentEn:
          "We assist clients in amicable resolution of disputes with merchants or service providers through mediation, negotiation, and effective legal alternatives to avoid lengthy litigation.",
      },
      {
        icon: FileCheck,
        title: "REPARAȚII ȘI DESPĂGUBIRI",
        titleEn: "REMEDIES AND COMPENSATION",
        content:
          "Oferim asistență pentru obținerea de despăgubiri, reparații, returnarea produselor sau prestarea serviciilor, prin acțiuni legale sau negociere directă cu comercianții.",
        contentEn:
          "We provide assistance in obtaining compensation, repairs, product returns, or service fulfillment, through legal action or direct negotiation with merchants.",
      },
    ],
  },
  "drept-mediu": {
    id: "drept-mediu",
    title: "Dreptul mediului",
    titleEn: "Environmental Law",
    description:
      "Oferim consultanță și reprezentare juridică specializată în domeniul protecției mediului, asigurând respectarea legislației naționale și internaționale și prevenind riscurile juridice și sancțiunile pentru companii și autorități.",
    descriptionEn:
      "We provide specialized legal advice and representation in environmental law, ensuring compliance with national and international regulations, and preventing legal risks and sanctions for companies and authorities.",

    sections: [
      {
        icon: Shield,
        title: "CONSULTANȚĂ ȘI AUTORIZAȚII",
        titleEn: "ENVIRONMENTAL CONSULTING AND PERMITS",
        content:
          "Asistăm companiile și autoritățile în obținerea autorizațiilor de mediu, conformitatea cu legislația aplicabilă, evaluarea impactului asupra mediului și elaborarea documentației necesare pentru proiecte industriale, de construcții sau de infrastructură.",
        contentEn:
          "We assist companies and authorities in obtaining environmental permits, ensuring compliance with applicable laws, environmental impact assessment, and preparing necessary documentation for industrial, construction, or infrastructure projects.",
      },
      {
        icon: FileText,
        title: "LITIGII DE MEDIU ȘI SANȚIUNI",
        titleEn: "ENVIRONMENTAL LITIGATION AND SANCTIONS",
        content:
          "Reprezentăm clienții în litigii de mediu, contestarea sancțiunilor administrativ-legale, proceduri de conformitate și investigații, protejând interesele acestora în fața instanțelor și autorităților de reglementare.",
        contentEn:
          "We represent clients in environmental disputes, challenging administrative sanctions, compliance procedures, and investigations, protecting their interests before courts and regulatory authorities.",
      },
      {
        icon: Briefcase,
        title: "CONSILIERE PREVENTIVĂ",
        titleEn: "PREVENTIVE LEGAL ADVICE",
        content:
          "Oferim consultanță preventivă privind riscurile de mediu, audituri interne, planuri de management al deșeurilor și strategii de prevenire a poluării, pentru reducerea riscurilor juridice și financiare.",
        contentEn:
          "We provide preventive advice on environmental risks, internal audits, waste management plans, and pollution prevention strategies to minimize legal and financial risks.",
      },
      {
        icon: Users,
        title: "SUSTENABILITATE ȘI REGLEMENTĂRI INTERNATIONALE",
        titleEn: "SUSTAINABILITY AND INTERNATIONAL REGULATIONS",
        content:
          "Consiliem clienții în implementarea practicilor sustenabile, respectarea normelor UE și internaționale de mediu, certificări și raportări, pentru alinierea activităților la standardele globale și prevenirea litigiilor.",
        contentEn:
          "We advise clients on implementing sustainable practices, complying with EU and international environmental standards, certifications, and reporting, ensuring alignment with global standards and preventing disputes.",
      },
      {
        icon: HelpCircle,
        title: "MEDIERE ȘI REPARAȚII",
        titleEn: "MEDIATION AND REMEDIES",
        content:
          "Asistăm în soluționarea amiabilă a conflictelor de mediu, negocierea despăgubirilor, remedierea impactului negativ și implementarea măsurilor corective, pentru reducerea costurilor și evitarea litigiilor prelungite.",
        contentEn:
          "We assist in amicable resolution of environmental conflicts, negotiating compensation, remediation of negative impact, and implementing corrective measures to reduce costs and avoid prolonged litigation.",
      },
    ],
  },

  "drepturile-omului-cedo": {
    id: "drepturile-omului-cedo",
    title: "Drepturile omului. Proceduri CEDO",
    titleEn: "Human Rights. ECHR Procedures",
    description:
      "Oferim asistență juridică specializată în protecția drepturilor fundamentale, reprezentare în fața Curții Europene a Drepturilor Omului și în proceduri interne privind drepturile omului, prevenind încălcările și protejând interesele clienților.",
    descriptionEn:
      "We provide specialized legal assistance in protecting fundamental rights, representation before the European Court of Human Rights, and domestic human rights procedures, preventing violations and safeguarding clients’ interests.",

    sections: [
      {
        icon: Shield,
        title: "DREPTURI FUNDAMENTALE",
        titleEn: "FUNDAMENTAL RIGHTS",
        content:
          "Oferim consultanță în domeniul drepturilor fundamentale, inclusiv dreptul la viață, libertatea de exprimare, dreptul la un proces echitabil și protecția vieții private. Consiliem clienții privind prevenirea încălcărilor și remediile legale disponibile la nivel național și internațional.",
        contentEn:
          "We provide advice on fundamental rights, including the right to life, freedom of expression, the right to a fair trial, and privacy protection. We advise clients on preventing violations and available legal remedies at national and international levels.",
      },
      {
        icon: FileText,
        title: "PROCEDURI CEDO",
        titleEn: "ECHR PROCEDURES",
        content:
          "Reprezentăm clienții în procedurile formulate în fața Curții Europene a Drepturilor Omului, incluzând analiza cauzelor, redactarea cererilor și pledoariilor, precum și strategii de apărare și urmărire eficientă a drepturilor încălcate.",
        contentEn:
          "We represent clients in proceedings before the European Court of Human Rights, including case analysis, drafting applications and pleadings, and developing effective defense strategies to pursue alleged rights violations.",
      },
      {
        icon: Briefcase,
        title: "REPREZENTARE ÎN LITIGII NAȚIONALE",
        titleEn: "DOMESTIC HUMAN RIGHTS LITIGATION",
        content:
          "Asistăm clienții în cauze interne privind drepturile omului, inclusiv acțiuni în fața instanțelor naționale și consultanță privind remediile disponibile prin proceduri administrative sau judiciare.",
        contentEn:
          "We assist clients in domestic human rights cases, including actions before national courts and advice on remedies available through administrative or judicial procedures.",
      },
      {
        icon: Users,
        title: "CONSILIERE PREVENTIVĂ ȘI EDUCAȚIE JURIDICĂ",
        titleEn: "PREVENTIVE ADVICE AND LEGAL EDUCATION",
        content:
          "Oferim consiliere preventivă organizațiilor și persoanelor, instruind cu privire la respectarea drepturilor omului, politici interne, proceduri de conformitate și prevenirea conflictelor juridice.",
        contentEn:
          "We provide preventive advice to organizations and individuals, training them on human rights compliance, internal policies, procedures, and prevention of legal conflicts.",
      },
      {
        icon: HelpCircle,
        title: "MEDIERE ȘI REPARAȚII",
        titleEn: "MEDIATION AND REMEDIES",
        content:
          "Asistăm în soluționarea amiabilă a conflictelor privind drepturile omului, negociind remedii, despăgubiri și măsuri corective, pentru reducerea litigiilor prelungite și protejarea intereselor părților.",
        contentEn:
          "We assist in amicable resolution of human rights conflicts, negotiating remedies, compensation, and corrective measures to reduce prolonged litigation and protect parties’ interests.",
      },
    ],
  },
  "achizitii-publice": {
    id: "achizitii-publice",
    title: "Achiziții publice",
    titleEn: "Public Procurement",
    description:
      "Frunză & Asociații oferă consultanță și reprezentare specializată în domeniul achizițiilor publice, asistând clienții în toate etapele procedurilor, asigurând respectarea legislației și protecția drepturilor și intereselor acestora.",
    descriptionEn:
      "Frunză & Asociații provides specialized advice and representation in public procurement, assisting clients at all stages of the process, ensuring legal compliance and protection of their rights and interests.",

    sections: [
      {
        icon: Briefcase,
        title: "CONSULTANȚĂ ÎN ACHIZIȚII PUBLICE",
        titleEn: "PUBLIC PROCUREMENT CONSULTING",
        content:
          "Oferim consultanță privind procedurile de achiziții publice, inclusiv pregătirea documentației de licitație, strategii de participare, respectarea criteriilor legale și interpretarea reglementărilor aplicabile.",
        contentEn:
          "We provide advice on public procurement procedures, including tender documentation preparation, participation strategies, compliance with legal criteria, and interpretation of applicable regulations.",
      },
      {
        icon: Shield,
        title: "CONTENCIOS ȘI LITIGII",
        titleEn: "PROCUREMENT LITIGATION",
        content:
          "Reprezentăm clienții în contenciosul achizițiilor publice, contestând decizii ale autorităților contractante, protejând drepturile participanților și asigurând respectarea principiilor transparenței și concurenței loiale.",
        contentEn:
          "We represent clients in public procurement disputes, challenging contracting authority decisions, protecting participants’ rights, and ensuring compliance with principles of transparency and fair competition.",
      },
      {
        icon: FileText,
        title: "CONSILIERE PENTRU CONTRACTE PUBLICE",
        titleEn: "PUBLIC CONTRACTS ADVISORY",
        content:
          "Oferim asistență în analiza, negocierea și redactarea contractelor de achiziții publice, inclusiv clauze de conformitate, penalități și mecanisme de rezolvare a disputelor.",
        contentEn:
          "We provide assistance in analyzing, negotiating, and drafting public procurement contracts, including compliance clauses, penalties, and dispute resolution mechanisms.",
      },
      {
        icon: Users,
        title: "AUDIT ȘI MONITORIZARE",
        titleEn: "AUDIT AND MONITORING",
        content:
          "Consiliem clienții în monitorizarea proceselor de achiziție publică și implementarea unui audit intern pentru prevenirea riscurilor legale și comerciale.",
        contentEn:
          "We advise clients on monitoring public procurement processes and implementing internal audits to prevent legal and commercial risks.",
      },
      {
        icon: HelpCircle,
        title: "PREVENIREA RISCURILOR ȘI CONFORMITATE",
        titleEn: "RISK PREVENTION AND COMPLIANCE",
        content:
          "Asistăm clienții în identificarea riscurilor asociate procedurilor de achiziții publice și implementarea măsurilor pentru asigurarea conformității cu legislația națională și europeană.",
        contentEn:
          "We assist clients in identifying risks associated with public procurement procedures and implementing measures to ensure compliance with national and EU legislation.",
      },
      {
        icon: FileCheck,
        title: "REPREZENTARE ÎN FAȚA AUTORITĂȚILOR",
        titleEn: "REPRESENTATION BEFORE AUTHORITIES",
        content:
          "Reprezentăm clienții în fața autorităților contractante și instituțiilor de control, inclusiv în inspecții, notificări și negocieri pentru soluționarea amiabilă a disputelor sau contestarea deciziilor.",
        contentEn:
          "We represent clients before contracting authorities and regulatory institutions, including inspections, notifications, and negotiations for amicable dispute resolution or challenging decisions.",
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="w-full h-64 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white animate-fade-in">
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
