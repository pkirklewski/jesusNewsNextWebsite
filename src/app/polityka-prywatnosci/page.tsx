import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polityka prywatności - JesusNews',
  description: 'Polityka prywatności serwisu JesusNews. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
  alternates: { canonical: '/polityka-prywatnosci/' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Polityka prywatności
      </h1>

      <div className="space-y-8 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            1. Administrator danych
          </h2>
          <p>
            Administratorem danych osobowych jest JesusNews z siedziba w Polsce.
            Kontakt z administratorem jest mozliwy pod adresem e-mail:{' '}
            <a href="mailto:kontakt@jesusnews.pl" className="text-accent hover:text-accent/80">
              kontakt@jesusnews.pl
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            2. Zakres zbieranych danych
          </h2>
          <p className="mb-3">Serwis JesusNews moze zbierac nastepujace dane:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Adres e-mail (w przypadku zapisu na newsletter)</li>
            <li>Dane analityczne dotyczace korzystania z serwisu (anonimowe statystyki)</li>
            <li>Pliki cookies niezbedne do funkcjonowania serwisu i wyswietlania reklam</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            3. Cel przetwarzania danych
          </h2>
          <p className="mb-3">Dane osobowe przetwarzane sa w nastepujacych celach:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Realizacja uslugi newslettera (podstawa prawna: art. 6 ust. 1 lit. a RODO — zgoda)</li>
            <li>Analiza statystyczna ruchu na stronie w celu poprawy jakosci serwisu (podstawa prawna: art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes)</li>
            <li>Wyswietlanie reklam dostosowanych do zainteresowari uzytkownika (podstawa prawna: art. 6 ust. 1 lit. a RODO — zgoda)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            4. Pliki cookies i technologie reklamowe
          </h2>
          <p className="mb-3">
            Serwis JesusNews korzysta z plikow cookies w nastepujacych celach:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-text-primary">Cookies niezbedne</strong> — zapewniaja prawidlowe funkcjonowanie serwisu</li>
            <li><strong className="text-text-primary">Cookies analityczne</strong> — Cloudflare Web Analytics (anonimowe, bez cookies)</li>
            <li><strong className="text-text-primary">Cookies reklamowe</strong> — Google AdSense i sieci reklamowe partnerow. Cookies te moga byc uzywane do personalizacji reklam na podstawie zainteresowari uzytkownika</li>
          </ul>
          <p className="mt-3">
            Uzytkownik moze zarzadzac preferencjami dotyczacymi plikow cookies za pomoca
            banera zgody wyswietlanego przy pierwszej wizycie na stronie. Mozna rowniez
            zmienic ustawienia cookies w przegladarce internetowej.
          </p>
          <p className="mt-3">
            Wiecej informacji o tym, jak Google wykorzystuje dane z witryn partnerow,
            mozna znalezc na stronie:{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:text-accent"
            >
              policies.google.com/technologies/partner-sites
            </a>.
            Ustawienia reklam mozna zmienic pod adresem:{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:text-accent"
            >
              adssettings.google.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            5. Prawa uzytkownika
          </h2>
          <p className="mb-3">Zgodnie z RODO, uzytkownikom przysluguja nastepujace prawa:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Prawo dostepu do swoich danych osobowych</li>
            <li>Prawo do sprostowania (poprawiania) danych</li>
            <li>Prawo do usunicia danych (&quot;prawo do bycia zapomnianym&quot;)</li>
            <li>Prawo do ograniczenia przetwarzania</li>
            <li>Prawo do przenoszenia danych</li>
            <li>Prawo do wniesienia sprzeciwu wobec przetwarzania</li>
            <li>Prawo do cofnicia zgody w dowolnym momencie</li>
            <li>Prawo do wniesienia skargi do organu nadzorczego (Prezes Urzedu Ochrony Danych Osobowych)</li>
          </ul>
          <p className="mt-3">
            W celu realizacji powyzszych praw prosimy o kontakt na adres:{' '}
            <a href="mailto:kontakt@jesusnews.pl" className="text-accent hover:text-accent/80">
              kontakt@jesusnews.pl
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            6. Okres przechowywania danych
          </h2>
          <p>
            Dane osobowe przechowywane sa przez okres niezbedny do realizacji celow,
            dla ktorych zostaly zebrane. W przypadku newslettera — do momentu rezygnacji
            z subskrypcji. Dane analityczne przechowywane sa w formie zanonimizowanej.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            7. Podmioty trzecie
          </h2>
          <p className="mb-3">Dane moga byc udostepniane nastepujacym podmiotom:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google LLC (Google AdSense — wyswietlanie reklam)</li>
            <li>Cloudflare Inc. (hosting, CDN, analityka)</li>
            <li>Buttondown (obsluga newslettera)</li>
          </ul>
          <p className="mt-3">
            Podmioty te przetwarzaja dane zgodnie z wlasnymi politykami prywatnosci
            i na podstawie odpowiednich mechanizmow transferu danych (w tym standardowych
            klauzul umownych dla transferow poza EOG).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            8. Zmiany w polityce prywatnosci
          </h2>
          <p>
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej
            polityce prywatnosci. O istotnych zmianach uzytkownicy zostana poinformowani
            za posrednictwem serwisu. Data ostatniej aktualizacji: marzec 2026.
          </p>
        </section>
      </div>
    </div>
  )
}
