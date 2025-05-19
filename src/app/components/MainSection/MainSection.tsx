import { motion } from "framer-motion";
import { TextAnimation } from "@/app/components/TextAnimation";
import { Button } from "antd";
import Link from "next/link";

export const MainSection = () => {
    const fullText = "Tələbə, veteran və şəhid ailəsinin üzvləri üçün pulsuz və ya endirimli xidmətlərdən yararlanın.";

    return (
        <section
            id="hero"
            style={{
                height: "100vh",
                background: "#001529",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "0 20px",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ maxWidth: "700px" }}
            >
                <h4 style={{ color: "#fff", fontSize: "3rem" }}>
                    {"BİZDƏN"}-ə Xoş Gəlmisiniz
                </h4>
                <TextAnimation fullText={fullText} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Button
                    type="default"
                    size="large"
                    shape="round"
                    style={{ minWidth: 160 }}>
                    <Link href={'/register'}>
                        Qeydiyyatdan keç
                    </Link>
                </Button>
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    style={{ minWidth: 160 }}
                >
                    <Link href={'/login'}>
                        Daxil ol
                    </Link>
                </Button>
            </motion.div>
        </section>
    )
}
