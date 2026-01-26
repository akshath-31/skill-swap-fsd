import { useState } from "react";
import { Coins, Plus, ArrowUpRight, ArrowDownLeft, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", type: "credit", amount: 100, description: "Welcome bonus", date: "2024-01-15" },
  { id: "2", type: "debit", amount: 25, description: "Learned UI/UX Design Fundamentals", date: "2024-01-14" },
  { id: "3", type: "credit", amount: 30, description: "Taught React Development Basics", date: "2024-01-12" },
  { id: "4", type: "debit", amount: 15, description: "Learned Spanish Conversation", date: "2024-01-10" },
  { id: "5", type: "credit", amount: 50, description: "Top up", date: "2024-01-08" },
  { id: "6", type: "credit", amount: 25, description: "Taught JavaScript Fundamentals", date: "2024-01-05" },
];

const Credits = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Credits added!",
      description: `${topUpAmount} credits have been added to your account.`,
    });

    setIsModalOpen(false);
    setIsSuccess(false);
    setTopUpAmount("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Credits</h1>
        <p className="text-muted-foreground">Manage your credit balance and view transaction history</p>
      </div>

      {/* Balance Card */}
      <div className="card-stat mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-primary" />
              <span className="text-5xl font-bold text-foreground">{user?.credits || 0}</span>
              <span className="text-xl text-muted-foreground">credits</span>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Top Up Credits
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Transaction History</h2>
        <div className="space-y-0">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="timeline-item animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`timeline-dot ${
                  transaction.type === "credit" ? "bg-success" : "bg-destructive"
                }`}
              />
              <div className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "credit"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <span
                    className={`text-lg font-semibold ${
                      transaction.type === "credit" ? "credit-positive" : "credit-negative"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}{transaction.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={() => !isLoading && setIsModalOpen(false)} />
          <div className="modal-content p-6 animate-scale-in">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Success!</h3>
                <p className="text-muted-foreground">Credits added to your account</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Top Up Credits</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleTopUp} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Amount</label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter credit amount"
                        min="10"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        className="pl-10 h-12 rounded-xl"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Minimum top-up: 10 credits</p>
                  </div>

                  <div className="flex gap-2">
                    {[25, 50, 100, 250].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setTopUpAmount(amount.toString())}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                          topUpAmount === amount.toString()
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-muted-foreground"
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      `Add ${topUpAmount || 0} Credits`
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Credits;
