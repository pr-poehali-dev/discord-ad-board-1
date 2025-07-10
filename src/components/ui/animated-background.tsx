import React from "react";

interface AnimatedBackgroundProps {
  className?: string;
  variant?: "header" | "full" | "section";
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = "",
  variant = "header",
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/5 via-blue-50/30 to-purple-50/20 dark:from-[#5865F2]/10 dark:via-gray-900/50 dark:to-purple-900/20" />

      {/* Анимированные геометрические узоры */}
      <div className="absolute inset-0">
        {/* Крупные дома - фоновый слой */}
        <div className="absolute top-10 left-10 w-32 h-32 opacity-5 dark:opacity-10">
          <div className="w-full h-full animate-float-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#5865F2]">
              <path
                d="M20 70 L50 40 L80 70 L80 85 L20 85 Z M35 70 L35 80 L45 80 L45 70 Z M55 70 L55 80 L65 80 L65 70 Z M50 45 L50 60 L60 60 L60 45 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        <div className="absolute top-32 right-20 w-24 h-24 opacity-5 dark:opacity-10">
          <div className="w-full h-full animate-float-medium">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-purple-400"
            >
              <path
                d="M25 75 L50 45 L75 75 L75 85 L25 85 Z M40 75 L40 82 L48 82 L48 75 Z M52 75 L52 82 L60 82 L60 75 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Ключи - средний слой */}
        <div className="absolute top-20 right-32 w-16 h-16 opacity-10 dark:opacity-15">
          <div className="w-full h-full animate-float-fast">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#5865F2]">
              <circle
                cx="25"
                cy="25"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <line
                x1="35"
                y1="25"
                x2="75"
                y2="25"
                stroke="currentColor"
                strokeWidth="4"
              />
              <line
                x1="65"
                y1="20"
                x2="65"
                y2="30"
                stroke="currentColor"
                strokeWidth="4"
              />
              <line
                x1="70"
                y1="15"
                x2="70"
                y2="25"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-40 left-16 w-12 h-12 opacity-10 dark:opacity-15">
          <div className="w-full h-full animate-float-medium rotate-45">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
              <circle
                cx="30"
                cy="30"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              <line
                x1="42"
                y1="30"
                x2="75"
                y2="30"
                stroke="currentColor"
                strokeWidth="5"
              />
              <line
                x1="65"
                y1="22"
                x2="65"
                y2="38"
                stroke="currentColor"
                strokeWidth="5"
              />
            </svg>
          </div>
        </div>

        {/* Документы/контракты - передний слой */}
        <div className="absolute bottom-20 right-10 w-20 h-20 opacity-8 dark:opacity-12">
          <div className="w-full h-full animate-float-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#5865F2]">
              <rect
                x="20"
                y="15"
                width="50"
                height="70"
                rx="3"
                fill="currentColor"
                opacity="0.6"
              />
              <line
                x1="28"
                y1="25"
                x2="55"
                y2="25"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="28"
                y1="35"
                x2="62"
                y2="35"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="28"
                y1="45"
                x2="50"
                y2="45"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="28"
                y1="55"
                x2="58"
                y2="55"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Монеты/доллары - акцентные элементы */}
        <div className="absolute top-60 left-1/3 w-14 h-14 opacity-12 dark:opacity-18">
          <div className="w-full h-full animate-float-fast">
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="currentColor"
                opacity="0.7"
              />
              <text
                x="50"
                y="60"
                textAnchor="middle"
                className="text-2xl font-bold fill-white"
              >
                $
              </text>
            </svg>
          </div>
        </div>

        {/* Геометрические паттерны для текстуры */}
        <div className="absolute inset-0 opacity-5 dark:opacity-8">
          <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 h-full w-full">
            {Array.from({ length: variant === "full" ? 192 : 96 }).map(
              (_, i) => (
                <div
                  key={i}
                  className={`
                  border border-[#5865F2]/10 dark:border-[#5865F2]/20
                  ${i % 3 === 0 ? "animate-pulse-slow" : ""}
                  ${i % 5 === 0 ? "bg-[#5865F2]/5 dark:bg-[#5865F2]/10" : ""}
                `}
                  style={{
                    animationDelay: `${(i * 0.1) % 3}s`,
                  }}
                />
              ),
            )}
          </div>
        </div>

        {/* Плавающие частицы */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-[#5865F2]/20 dark:bg-[#5865F2]/30 rounded-full
                animate-float-random opacity-60
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Светящиеся акценты по углам */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-[#5865F2]/10 to-transparent rounded-full blur-xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-xl animate-pulse-glow-delayed" />
    </div>
  );
};

export default AnimatedBackground;
