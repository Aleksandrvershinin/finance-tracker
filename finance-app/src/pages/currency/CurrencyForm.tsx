import React, { useState } from 'react'
import axiosInstance from '../../shared/api/axiosInstance'

const CurrencyForm = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newCurrency = {
      code,
      name,
      symbol,
    }

    try {
      const response = await axiosInstance.post('/currencies', newCurrency)
      console.log('Валюта добавлена:', response.data)
      // Можно добавить логику для очистки формы или отображения успешного сообщения
    } catch (err) {
      setError('Ошибка при добавлении валюты')
      console.error(err)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Добавить новую валюту
      </h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Код валюты
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Полное название
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
            Символ
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Создать валюту
        </button>
      </form>
    </div>
  )
}

export default CurrencyForm
