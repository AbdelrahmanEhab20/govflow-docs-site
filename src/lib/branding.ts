export const branding = {
  appName: "GovFlow Documentation Portal",
  appTagline: "Enterprise Documentation & Management System",
  organization: "SW Solutions",
  audience: "UAE Government / Enterprise",
  logoText: "GovFlow",
  description: "Centralized hub for procurement-ready GovFlow system documentation, architectural specifications, commercial models, and deployment guidance.",

  colors: {
    brand50: "239 246 255",
    brand100: "219 234 254",
    brand500: "37 99 235",
    brand700: "29 78 216",
    brand900: "30 58 138",
  },

  fontFamily: {
    sans: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },

  sections: {
    platform: {
      color: "blue",
      icon: "Zap",
      description: "Platform overview and executive documentation"
    },
    architecture: {
      color: "purple",
      icon: "FileText",
      description: "Infrastructure and system architecture"
    },
    pricing: {
      color: "green",
      icon: "DollarSign",
      description: "Pricing models and commercial structure"
    },
    deployment: {
      color: "orange",
      icon: "Rocket",
      description: "Deployment and implementation"
    },
    docs: {
      color: "indigo",
      icon: "BookOpen",
      description: "Complete documentation"
    },
    rfp: {
      color: "rose",
      icon: "FileCheck",
      description: "Proposals and RFP templates"
    }
  }
} as const;

