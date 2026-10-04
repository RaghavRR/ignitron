export const createKitWhatsAppUrl = (kit) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  if (!phoneNumber) {
    console.error('VITE_WHATSAPP_NUMBER is missing');
    return '#';
  }

  const message = `
Hello IGNITRON,

I am interested in purchasing this DIY STEM Kit.

Kit: ${kit.name}
Price: ₹${Number(kit.price).toLocaleString('en-IN')}

Please share the purchase details, availability and delivery information.

Thank you.
`.trim();

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};