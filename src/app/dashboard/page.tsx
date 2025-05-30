import { Suspense } from "react";
import { DiscountsList } from "./components/DiscountsList";



// Main Dashboard Pagez
const DashboardPage = async () => {


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">


            <Suspense fallback={
                <div className="text-center py-12">
                    <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mx-auto"></span>
                </div>
            }>
                <DiscountsList />
            </Suspense>
        </div>
    );
};

export default DashboardPage;