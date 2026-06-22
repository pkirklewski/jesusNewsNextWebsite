import type { Metadata } from 'next'
import { Target, Globe, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'O nas - JesusNews',
  description:
    'Poznaj JesusNews - autorski portal analityczny poświęcony rynkowi kryptowalut i technologii blockchain.',
  alternates: { canonical: '/o-nas/' },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          O JesusNews
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Autorski portal analityczny poświęcony rynkowi kryptowalut
          i technologii blockchain.
        </p>
      </div>

      {/* Mission Section */}
      <section className="bg-card border border-border rounded-2xl p-8 lg:p-10 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Nasza misja
        </h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            JesusNews to autorski polski portal analityczny poświęcony rynkowi
            kryptowalut, technologii blockchain i aktywom cyfrowym. Naszym celem
            jest dostarczanie oryginalnych analiz i komentarzy eksperckich, które
            pomagają polskim inwestorom podejmować świadome decyzje.
          </p>
          <p>
            Nasz zespół redakcyjny na bieżąco monitoruje globalne rynki kryptowalut,
            analizuje trendy cenowe, śledzi zmiany regulacyjne i ocenia ich wpływ
            na polski rynek. Każdy artykuł zawiera autorski komentarz i perspektywę
            dostosowaną do polskiego kontekstu — uwzględniamy lokalne regulacje KNF,
            sytuację na polskich giełdach i kursy walutowe.
          </p>
          <p>
            Wierzymy, że dostęp do rzetelnych, profesjonalnych analiz w ojczystym
            języku jest kluczowy w dynamicznie rozwijającym się świecie kryptowalut.
          </p>
        </div>
      </section>

      {/* Author Section */}
      <section className="bg-card border border-border rounded-2xl p-8 lg:p-10 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Redaktor naczelny
        </h2>
        <div className="flex items-start gap-6">
          <div className="shrink-0 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <span className="text-accent font-bold text-xl">KJ</span>
          </div>
          <div className="text-text-secondary leading-relaxed">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Kirk Peter Johanson
            </h3>
            <p className="text-sm text-accent mb-3">Analityk rynku kryptowalut</p>
            <p>
              Doświadczony analityk rynków finansowych z wieloletnim doświadczeniem
              w branży kryptowalut i technologii blockchain. Specjalizuje się w analizie
              trendów rynkowych, regulacji europejskich i wpływu globalnych wydarzeń
              na rynek aktywów cyfrowych.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mb-4">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Aktualność
          </h3>
          <p className="text-text-secondary text-sm">
            Publikujemy analizy najważniejszych wydarzeń na rynku kryptowalut
            w ciągu kilku godzin od ich wystąpienia.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-accent-blue/10 rounded-lg mb-4">
            <Globe className="w-5 h-5 text-accent-blue" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Globalny zasięg
          </h3>
          <p className="text-text-secondary text-sm">
            Monitorujemy globalne rynki kryptowalut i analizujemy wydarzenia
            z perspektywy polskiego inwestora.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/10 rounded-lg mb-4">
            <Target className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Polski kontekst
          </h3>
          <p className="text-text-secondary text-sm">
            Każdą analizę opatrujemy komentarzem dotyczącym wpływu na polski
            rynek, regulacje KNF i sytuację polskiego inwestora.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-lg mb-4">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Rzetelność
          </h3>
          <p className="text-text-secondary text-sm">
            Opieramy się na sprawdzonych danych rynkowych. Nie publikujemy
            niesprawdzonych informacji ani sensacyjnych nagłówków.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-card border border-border rounded-2xl p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Kontakt</h2>
        <div className="space-y-3 text-text-secondary">
          <p>
            Masz pytania, sugestie lub chcesz nawiązać współpracę? Skontaktuj
            się z nami:
          </p>
          <div className="space-y-2">
            <p>
              <span className="text-text-primary font-medium">E-mail:</span>{' '}
              <a
                href="mailto:kontakt@jesusnews.pl"
                className="text-accent hover:text-accent/80"
              >
                kontakt@jesusnews.pl
              </a>
            </p>
            <p>
              <span className="text-text-primary font-medium">Facebook:</span>{' '}
              <a
                href="https://www.facebook.com/profile.php?id=61580701780323"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:text-accent-blue/80"
              >
                JesusNews na Facebooku
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-card/50 border border-border/50 rounded-lg">
        <p className="text-text-secondary/60 text-xs text-center">
          Informacje zawarte na tej stronie nie stanowią porady inwestycyjnej.
          Inwestowanie w kryptowaluty wiąże się z wysokim ryzykiem utraty
          kapitału. Przed podjęciem decyzji inwestycyjnych skonsultuj się
          z licencjonowanym doradcą finansowym.
        </p>
      </div>
    </div>
  )
}
