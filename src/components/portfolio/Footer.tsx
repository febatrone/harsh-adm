import { useCMSDocument } from "@/lib/cms-hooks";

const defaultFooterConfig = {
  profileName: "Harsh Thaker",
  linkedin: "https://www.linkedin.com/in/harsh-thaker-a9b664230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  email: "harshthaker84@gmail.com",
};

export function Footer() {
  const { data: customConfig } = useCMSDocument<any>("config", "main");
  const config = { ...defaultFooterConfig, ...customConfig };

  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t-2 border-primary-container relative overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-8 w-full px-6">
        <div className="font-black text-primary-container text-4xl md:text-5xl font-headline uppercase tracking-tighter">
          {config.profileName}
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <a
            href={config.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary-container transition-colors font-mono uppercase tracking-widest text-sm"
          >
            LinkedIn //
          </a>
          <a
            href={`mailto:${config.email}`}
            className="text-on-surface-variant hover:text-primary-container transition-colors font-mono uppercase tracking-widest text-sm"
          >
            Email //
          </a>
        </div>
        <div className="text-on-surface-variant/60 font-mono text-xs uppercase tracking-[0.4em] pt-6 flex flex-col items-center gap-4 text-center">
          <span>© {new Date().getFullYear()} {config.profileName} • Ahmedabad, India</span>
          <div className="flex flex-col items-center gap-1">
            <span className="opacity-80">Built with</span>
            <span className="text-2xl animate-pulse">🧡</span>
            <span className="opacity-80">
              by <span className="text-primary-container font-bold">FEBATRONE</span> & Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
