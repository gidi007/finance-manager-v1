"use client"

import { useState } from "react"
import { Plus, DollarSign, TrendingUp, PiggyBank } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Transaction = {
  id: number
  type: "income" | "expense"
  amount: number
  description: string
}

export default function FinanceManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [newTransaction, setNewTransaction] = useState({
    type: "income",
    amount: "",
    description: "",
  })
  const [savingsGoal, setSavingsGoal] = useState(1000)
  const [investments, setInvestments] = useState([
    { name: "Stocks", value: 5000 },
    { name: "Bonds", value: 3000 },
    { name: "Real Estate", value: 10000 },
  ])

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description) {
      setTransactions([
        ...transactions,
        {
          id: Date.now(),
          type: newTransaction.type as "income" | "expense",
          amount: parseFloat(newTransaction.amount),
          description: newTransaction.description,
        },
      ])
      setNewTransaction({ type: "income", amount: "", description: "" })
    }
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const currentSavings = totalIncome - totalExpenses
  const savingsProgress = (currentSavings / savingsGoal) * 100

  const totalInvestments = investments.reduce((sum, inv) => sum + inv.value, 0)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Finance Manager</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Income: ${totalIncome.toFixed(2)}</p>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
            <p>Current Savings: ${currentSavings.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) =>
                    setNewTransaction({ ...newTransaction, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: e.target.value,
                    })
                  }
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description"
                />
              </div>
              <Button onClick={addTransaction}>
                <Plus className="mr-2 h-4 w-4" /> Add Transaction
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Goal: ${savingsGoal}</p>
            <Progress value={savingsProgress} className="mt-2" />
            <p className="mt-2">
              Progress: {savingsProgress.toFixed(2)}% (${currentSavings.toFixed(2)})
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setSavingsGoal(savingsGoal + 500)}
            >
              <PiggyBank className="mr-2 h-4 w-4" /> Increase Goal
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {transactions.slice(-5).reverse().map((transaction) => (
              <li
                key={transaction.id}
                className={`flex justify-between items-center p-2 rounded ${
                  transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span>{transaction.description}</span>
                <span
                  className={
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
          <CardDescription>Total Value: ${totalInvestments.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {investments.map((investment, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{investment.name}</span>
                <span>${investment.value.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" /> Manage Investments
          </Button>
        </CardFooter>
      </Card>
    </div>
  )}

