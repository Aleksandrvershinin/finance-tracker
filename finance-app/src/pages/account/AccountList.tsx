// src/pages/AccountList.tsx

import { useEffect, useState } from 'react'
import axiosInstance from '../../shared/api/axiosInstance'
import { Link } from 'react-router-dom'

const AccountList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [accounts, setAccounts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axiosInstance
      .get('/accounts')
      .then((response) => {
        setAccounts(response.data)
      })
      .catch((err) => {
        setError('Ошибка при загрузке счетов')
        console.error(err)
      })
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/accounts/${id}`)
      setAccounts(accounts.filter((account) => account.id !== id))
    } catch (err) {
      setError('Ошибка при удалении счета')
      console.error(err)
    }
  }

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-4">
        <Link to="./add">
          <button className="p-2 bg-blue-500 text-white rounded">
            Добавить счет
          </button>
        </Link>
      </div>

      <h2 className="text-xl font-semibold">Список счетов</h2>
      {accounts.length > 0 ? (
        <table className="table-auto w-full mt-4 border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Баланс</th>
              <th className="border p-2">Валюта</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="border p-2">{account?.balance}</td>
                <td className="border p-2">{account?.currency?.code}</td>
                <td className="border p-2">
                  <button
                    className="p-2 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(account.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет доступных счетов.</p>
      )}
    </div>
  )
}

export default AccountList
