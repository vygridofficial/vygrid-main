export function cn(...inputs: (string | undefined | null | boolean | { [key: string]: boolean | undefined | null })[]) {
  const classes: string[] = [];
  inputs.forEach((input) => {
    if (!input) return;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });
  return classes.join(' ');
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatDynamicText(text: string, companyName: string): string {
  if (!text) return "";
  return text.replace(/(Vygrid Digital Studio|Vygrid)/g, companyName);
}
