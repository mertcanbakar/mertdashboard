import MainLayout from "../../components/layouts/mainLayout/MainLayout";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="w-full bg-white mb-8 p-6 rounded-2xl border border-[#90caf975]">
        <h2 className="text-xl font-medium">{t("dashboard")}</h2>
      </div>
      <div className="w-full bg-white p-6 rounded-2xl border border-[#90caf975]">
        <p className="text-sm text-zinc-600">{t("welcome")}, Mert Can Bakar</p>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
