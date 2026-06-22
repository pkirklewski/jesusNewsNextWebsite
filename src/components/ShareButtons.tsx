import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
      hoverColor: 'hover:text-sky-400 hover:bg-sky-400/10',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      hoverColor: 'hover:text-blue-500 hover:bg-blue-500/10',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: Linkedin,
      hoverColor: 'hover:text-blue-400 hover:bg-blue-400/10',
    },
  ]

  return (
    <div className="flex items-center space-x-2">
      <span className="text-text-secondary text-sm mr-1">Udostępnij:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-text-secondary p-2 rounded-lg border border-border ${link.hoverColor} transition-all`}
          aria-label={`Udostępnij na ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  )
}
