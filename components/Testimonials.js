const testimonials = [
  {
    name: "Denise R.",
    quote:
      "Our caregiver treats my mother like family. She's punctual, patient, and always goes the extra mile.",
  },
  {
    name: "Michael T.",
    quote:
      "Blessed Hearts made the Medicaid waiver process painless and matched us with a wonderful caregiver within a week.",
  },
  {
    name: "Angela P.",
    quote:
      "Respite care from this team gave me the break I badly needed, knowing my husband was in good hands.",
  },
];

export default function Testimonials() {
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Client Stories</span>
          <h2 id="testimonials-heading">Families Trust Blessed Hearts</h2>
        </div>
        <ul className="grid grid--3">
          {testimonials.map((t) => (
            <li key={t.name} className="card">
              <p style={{ fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ margin: 0, fontWeight: 600, color: "var(--plum)" }}>{t.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
