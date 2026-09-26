export const metadata = {
  title: "Admin Portal | Blessed Hearts Homecare",
  description: "Secure administrative portal for Blessed Hearts Homecare care coordinators.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fc" }}>
      {children}
    </div>
  );
}
