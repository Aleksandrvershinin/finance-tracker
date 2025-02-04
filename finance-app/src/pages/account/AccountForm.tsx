import React, { useState, useEffect } from 'react'
import axiosInstance from '../../shared/api/axiosInstance'
import Select from 'react-select'
import { currencyApi } from '../../entities/currency/api/currency.api'

const AccountForm = () => {
  const [currencyId, setCurrencyId] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>('')
  const [name, setName] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currencies, setCurrencies] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  // Загружаем список валют при монтировании компонента
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await currencyApi.index()
        setCurrencies(currencies)
      } catch (err) {
        setError('Ошибка при загрузке валют')
        console.error(err)
      }
    }
    fetchCurrencies()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currencyId) {
      setError('Пожалуйста, выберите валюту')
      return
    }

    const newAccount = {
      name,
      currencyId: Number(currencyId),
      balance: parseFloat(balance),
    }

    try {
      const response = await axiosInstance.post('/accounts', newAccount)
      console.log('Счет добавлен:', response.data)
    } catch (err) {
      setError('Ошибка при добавлении счета')
      console.error(err)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Добавить новый счет
      </h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Название счета
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Валюта
          </label>
          <Select
            options={currencies.map((currency) => ({
              value: currency.id,
              label: currency.code, // или currency.name, если нужно
            }))}
            onChange={(selectedOption) =>
              setCurrencyId(selectedOption?.value || null)
            }
            value={
              currencyId
                ? {
                    value: currencyId,
                    label: currencies.find((c) => c.id === currencyId)?.code,
                  }
                : null
            }
            placeholder="Выберите валюту"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Баланс
          </label>
          <input
            type="number"
            step="0.01"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Создать счет
        </button>
      </form>
    </div>
  )
}

export default AccountForm
