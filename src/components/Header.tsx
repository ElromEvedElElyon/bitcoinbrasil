import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface HeaderProps {
  title?: string;
  showBackLink?: boolean;
  color?: "orange" | "blue" | "purple" | "green";
}

export default function Header({ 
  title = "Bitcoin Brasil", 
  showBackLink = false,
  color = "orange" 
}: HeaderProps) {
  const colorClasses = {
    orange: {
      text: "text-standard-orange",
      bg: "gradient-standard",
      border: "border-standard-orange"
    },
    blue: {
      text: "text-blue-600", 
      bg: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200"
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-600 hover:bg-purple-700", 
      border: "border-purple-200"
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-600 hover:bg-green-700",
      border: "border-green-200"
    }
  };

  const colors = colorClasses[color];

  return (
    <header className={`bg-standard-dark shadow-lg border-b-2 ${colors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackLink && (
              <Link href="/" className={`flex items-center space-x-2 ${colors.text} hover:opacity-80`}>
                <span>← Voltar</span>
              </Link>
            )}
            <h1 className={`text-2xl font-bold text-white`}>{title}</h1>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://yuotube.ai" 
              target="_blank"
              rel="noopener noreferrer"
              className={`gradient-standard text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:opacity-90 transition-opacity`}
            >
              YuoTube.ai <ExternalLink size={14} />
            </a>
            <a 
              href="https://standardbitcoin.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-standard-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm border border-standard-orange"
            >
              Standard Bitcoin <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}