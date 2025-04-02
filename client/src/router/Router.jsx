import { Route, Routes, Navigate } from "react-router-dom";
import UnderConstruction from "@/components/UnderConstruction/UnderConstruction";
import RecruitmentForm from "@/components/Forms/RecruitmentForm";
import Layout from "@/layout/Layout";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UnderConstruction />} />
        <Route path="/recruit" element={<RecruitmentForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default Router;
