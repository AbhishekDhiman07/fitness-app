const Footer = () => (
  <footer className="section-padding py-12 border-t border-border">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">FitMotion</p>
      <p>© {new Date().getFullYear()} FitMotion. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
