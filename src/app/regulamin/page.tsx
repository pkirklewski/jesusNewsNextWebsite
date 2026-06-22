import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regulamin - JesusNews',
  description: 'Regulamin korzystania z serwisu JesusNews.',
  alternates: { canonical: '/regulamin/' },
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Regulamin serwisu JesusNews
      </h1>

      <div className="space-y-8 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            1. Postanowienia ogolne
          </h2>
          <p className="mb-3">
            Niniejszy regulamin okreslazasady korzystania z serwisu internetowego
            JesusNews dostepnego pod adresem jesusnews.pl (dalej: &quot;Serwis&quot;).
          </p>
          <p>
            Wlascicielem i operatorem Serwisu jest JesusNews z siedziba w Polsce.
            Kontakt: <a href="mailto:kontakt@jesusnews.pl" className="text-accent hover:text-accent/80">kontakt@jesusnews.pl</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            2. Charakter serwisu
          </h2>
          <p className="mb-3">
            Serwis JesusNews jest portalem informacyjno-analitycznym poswieconym
            rynkowi kryptowalut, technologii blockchain i aktywom cyfrowym.
          </p>
          <p>
            Tresci publikowane w Serwisie maja charakter wylacznie informacyjny
            i edukacyjny. <strong className="text-text-primary">Nie stanowia porady inwestycyjnej,
            rekomendacji finansowej ani oferty zakupu lub sprzedazy jakichkolwiek
            instrumentow finansowych.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            3. Zasady korzystania
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Korzystanie z Serwisu jest bezplatne i nie wymaga rejestracji.</li>
            <li>Uzytkownik zobowiazuje sie do korzystania z Serwisu zgodnie z obowiazujacym prawem i dobrymi obyczajami.</li>
            <li>Zabronione jest kopiowanie, rozpowszechnianie lub wykorzystywanie tresci Serwisu w celach komercyjnych bez pisemnej zgody administratora.</li>
            <li>Uzytkownik moze udostepniac linki do artykulow w mediach spolecznosciowych.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            4. Newsletter
          </h2>
          <p className="mb-3">
            Serwis oferuje mozliwosc zapisu na bezplatny newsletter z najwazniejszymi
            wiadomosciami ze swiata kryptowalut.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Zapis na newsletter jest dobrowolny i wymaga podania adresu e-mail.</li>
            <li>Uzytkownik moze w kazdej chwili zrezygnowac z subskrypcji poprzez link w wiadomosci e-mail.</li>
            <li>Dane zebrane w zwiazku z newsletterem przetwarzane sa zgodnie z Polityka Prywatnosci.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            5. Wlasnosc intelektualna
          </h2>
          <p>
            Wszystkie tresci publikowane w Serwisie, w tym artykuly, analizy, grafiki
            i elementy interfejsu, sa chronione prawem autorskim i stanowia wlasnosc
            intelektualna JesusNews lub ich autorów. Wykorzystywanie tresci bez zgody
            jest zabronione.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            6. Ograniczenie odpowiedzialnosci
          </h2>
          <p className="mb-3">
            Administrator doklada staranrzyjnosci w celu zapewnienia rzetelnosci
            i aktualnosci publikowanych tresci, jednakze:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nie gwarantuje kompletnosci, dokladnosci ani aktualnosci informacji.</li>
            <li>Nie ponosi odpowiedzialnosci za decyzje inwestycyjne podjete na podstawie tresci Serwisu.</li>
            <li>Nie ponosi odpowiedzialnosci za straty finansowe wynikajace z inwestycji w kryptowaluty.</li>
            <li>Nie odpowiada za dzialanie linkow zewnetrznych ani tresci na stronach trzecich.</li>
          </ul>
          <p className="mt-3">
            <strong className="text-text-primary">Inwestowanie w kryptowaluty wiaze sie z wysokim ryzykiem
            utraty kapitalu.</strong> Przed podjeciem decyzji inwestycyjnych nalezy skonsultowac
            sie z licencjonowanym doradca finansowym.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            7. Reklamy
          </h2>
          <p>
            Serwis moze wyswietlac reklamy dostarczane przez partnerow reklamowych,
            w tym Google AdSense. Reklamy moga byc personalizowane na podstawie
            zainteresowari uzytkownika, o ile wyrazil on na to zgode. Wiecej informacji
            znajduje sie w Polityce Prywatnosci.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            8. Zmiany regulaminu
          </h2>
          <p>
            Administrator zastrzega sobie prawo do zmiany niniejszego regulaminu.
            Zmiany wchodza w zycie z chwila ich opublikowania na stronie Serwisu.
            Data ostatniej aktualizacji: marzec 2026.
          </p>
        </section>
      </div>
    </div>
  )
}
