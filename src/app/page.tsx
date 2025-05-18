import {MainSection} from "@/app/components/MainSection";
import {HowSection} from "@/app/components/HowSection";
import {ContactSection} from "@/app/components/ContactSection";

export default function Home() {

  return (
    <div>
      <MainSection />
        <section
            id="about"
            style={{
                padding: "80px 20px",
                backgroundColor: "#fff",
                textAlign: "center",
            }}
        >
            <h4>Haqqımızda</h4>
            <p style={{ maxWidth: 800, margin: "0 auto" }}>
                Platformamız tələbələr və veteranlar üçün müxtəlif xidmətlərə çıxışı
                asanlaşdırmaq və onların həyatını daha da rahatlaşdırmaq üçün
                yaradılmışdır.
            </p>
        </section>

        <section
            id="vision"
            style={{
                padding: "80px 20px",
                backgroundColor: "#fafafa",
                textAlign: "center",
            }}
        >
            <h4>Vizyonumuz</h4>
            <p style={{ maxWidth: 800, margin: "0 auto" }}>
                Tələbələri, veteranları və şəhid ailələrinin üzvlərini dəstəkləmək – gələcəyin sağlam cəmiyyətini qurmağın açarıdır. Ona görə də, dəstək bu dəfə BIZDƏN gəlməlidir.                    </p>
        </section>

        <HowSection />
        <ContactSection />
    </div>
  );
}
