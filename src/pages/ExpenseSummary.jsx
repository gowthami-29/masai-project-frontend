import { useEffect, useState } from "react";
import { getExpenseSummary, getMonthlySummary } from "../services/summaryService";

import {
Card,
CardContent,
CardHeader,
CardTitle,
CardDescription,
} from "@/components/ui/card";

export default function ExpenseSummary() {

const [summary, setSummary] = useState(null);
const [monthly, setMonthly] = useState({});

const fetchSummary = async () => {
try {
const res = await getExpenseSummary();
console.log(res.data);
setSummary(res.data);
} catch (error) {
console.log(error);
}
};

const fetchMonthly = async () => {
try {
const res = await getMonthlySummary();
setMonthly(res.data);
} catch (error) {
console.log(error);
}
};

useEffect(() => {
fetchSummary();
fetchMonthly();
}, []);

return (
<div className="min-h-screen bg-accent p-8">

  <div className="max-w-7xl mx-auto space-y-8">

    {/* Header */}
    <div className="text-center">
      <h1 className="text-3xl font-bold">
        Expense Summary 📊
      </h1>

      <p className="text-gray-500">
        Overview of your total and categorized expenses
      </p>
    </div>

    {/* Total Expense */}
    {summary && (
      <Card>
        <CardHeader>
          <CardTitle>Total Expense</CardTitle>
          <CardDescription>
            Overall spending amount
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-3xl font-bold text-blue-600">
            ₹ {summary.totalExpense}
          </p>
        </CardContent>
      </Card>
    )}

    {/* Category Breakdown */}
    {summary && (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">

          {Object.entries(summary.categoryBreakdown || {}).map(
            ([cat, amt]) => (

              <div
                key={cat}
                className="flex justify-between border p-2 rounded"
              >

                <span>{cat}</span>
                <span>₹ {amt}</span>

              </div>

            )
          )}

        </CardContent>
      </Card>
    )}

  </div>

</div>

);
}