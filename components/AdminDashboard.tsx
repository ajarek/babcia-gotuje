"use client"

import React, { useState } from "react"
import { useRestaurant } from "@/context/RestaurantContext"
import {
  ClipboardList,
  CalendarCheck,
  PlusCircle,
  XCircle,
  Trash2,
  MapPin,
  Phone,
} from "lucide-react"

export default function AdminDashboard() {
  const {
    allOrders,
    allReservations,
    updateOrderStatus,
    updateReservationStatus,
    deleteOrder,
    deleteReservation,
    addCustomMenuItem,
  } = useRestaurant()

  const [activeTab, setActiveTab] = useState<
    "orders" | "reservations" | "add-item"
  >("orders")

  // Custom Menu Item Form State
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemCategory, setItemCategory] = useState<
    "soups" | "mains" | "desserts" | "drinks"
  >("mains")
  const [itemImage, setItemImage] = useState("")
  const [isPopular, setIsPopular] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Metrics
  const totalSales = allOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0)

  const pendingOrdersCount = allOrders.filter(
    (o) => o.status === "pending",
  ).length
  const activeReservationsCount = allReservations.filter(
    (r) => r.status === "pending",
  ).length

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess(false)

    if (!itemName || !itemDescription || !itemPrice) {
      setSubmitError("Proszę wypełnić wszystkie wymagane pola!")
      return
    }

    try {
      const parsedPrice = Number(itemPrice)
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        throw new Error("Cena musi być liczbą dodatnią!")
      }

      const defaultImage =
        itemImage || `https://picsum.photos/seed/${itemName}/800/600`

      await addCustomMenuItem({
        name: itemName,
        description: itemDescription,
        price: parsedPrice,
        category: itemCategory,
        image: defaultImage,
        isPopular,
        isVegetarian,
      })

      setSubmitSuccess(true)
      // Reset form
      setItemName("")
      setItemDescription("")
      setItemPrice("")
      setItemImage("")
      setIsPopular(false)
      setIsVegetarian(false)
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || "Wystąpił błąd podczas dodawania dania.")
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Czy na pewno chcesz trwale usunąć to zamówienie?")) return
    try {
      await deleteOrder(orderId)
    } catch (err) {
      console.error("Usuwanie zamówienia nie powiodło się:", err)
      alert("Nie udało się usunąć zamówienia. Spróbuj ponownie.")
    }
  }

  const handleDeleteReservation = async (resId: string) => {
    if (!confirm("Czy na pewno chcesz trwale usunąć tę rezerwację?")) return
    try {
      await deleteReservation(resId)
    } catch (err) {
      console.error("Usuwanie rezerwacji nie powiodło się:", err)
      alert("Nie udało się usunąć rezerwacji. Spróbuj ponownie.")
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-xl border border-amber-900/10 overflow-hidden font-sans text-[#2D241E] max-w-6xl mx-auto p-6 sm:p-8'>
      {/* Header */}
      <div className='border-b border-amber-900/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <span className='px-3 py-1 bg-amber-100 text-[#78350F] rounded-full text-xs font-bold uppercase tracking-wider'>
            PANEL ZARZĄDZANIA
          </span>
          <h2 className='font-serif text-3xl font-bold text-[#4A2E1A] mt-2'>
            Babcia Gotuje • Administracja
          </h2>
          <p className='text-sm text-amber-950/60 mt-1'>
            Zarządzaj rezerwacjami stolików, zamówieniami klientów i
            asortymentem menu w czasie rzeczywistym.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className='grid grid-cols-3 gap-3'>
          <div className='p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center'>
            <p className='text-[10px] text-emerald-800 uppercase tracking-widest font-semibold'>
              Utarg (dostarczone)
            </p>
            <p className='text-sm sm:text-base font-bold text-emerald-950 mt-0.5'>
              {totalSales} zł
            </p>
          </div>
          <div className='p-3 bg-amber-50 rounded-xl border border-amber-100 text-center'>
            <p className='text-[10px] text-amber-800 uppercase tracking-widest font-semibold'>
              Zamówienia
            </p>
            <p className='text-sm sm:text-base font-bold text-amber-950 mt-0.5'>
              {pendingOrdersCount} oczk.
            </p>
          </div>
          <div className='p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-center'>
            <p className='text-[10px] text-indigo-800 uppercase tracking-widest font-semibold'>
              Rezerwacje
            </p>
            <p className='text-sm sm:text-base font-bold text-indigo-950 mt-0.5'>
              {activeReservationsCount} oczk.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className='flex border-b border-amber-900/10 mb-8 overflow-x-auto whitespace-nowrap'>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === "orders"
              ? "border-[#78350F] text-[#78350F]"
              : "border-transparent text-amber-950/60 hover:text-amber-900"
          }`}
        >
          <ClipboardList size={18} />
          <span>Zamówienia ({allOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("reservations")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === "reservations"
              ? "border-[#78350F] text-[#78350F]"
              : "border-transparent text-amber-950/60 hover:text-amber-900"
          }`}
        >
          <CalendarCheck size={18} />
          <span>Rezerwacje Stolików ({allReservations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("add-item")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === "add-item"
              ? "border-[#78350F] text-[#78350F]"
              : "border-transparent text-amber-950/60 hover:text-amber-900"
          }`}
        >
          <PlusCircle size={18} />
          <span>Dodaj Danie do Menu</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      <div>
        {activeTab === "orders" && (
          <div className='space-y-4'>
            {allOrders.length === 0 ? (
              <div className='text-center py-12 text-amber-950/40'>
                Brak zamówień w systemie.
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse min-w-[700px]'>
                  <thead>
                    <tr className='border-b border-amber-900/10 text-xs font-bold uppercase text-amber-900/60 bg-amber-500/5'>
                      <th className='p-4'>Zamawiający</th>
                      <th className='p-4'>Dania</th>
                      <th className='p-4'>Suma</th>
                      <th className='p-4'>Kontakt & Adres</th>
                      <th className='p-4'>Status</th>
                      <th className='p-4 text-right'>Akcja</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-amber-900/5 text-sm'>
                    {allOrders.map((order) => (
                      <tr
                        key={order.id}
                        className='hover:bg-amber-500/5 transition'
                      >
                        <td className='p-4 font-semibold text-[#4A2E1A]'>
                          <div>{order.userName}</div>
                          <div className='text-xs font-normal text-amber-950/50'>
                            {order.userEmail}
                          </div>
                          <div className='text-[10px] font-mono text-amber-950/40 mt-1'>
                            ID: {order.id.substring(0, 8)}...
                          </div>
                        </td>
                        <td className='p-4 max-w-[220px]'>
                          <div className='space-y-1'>
                            {order.items.map((it, i) => (
                              <div key={i} className='text-xs'>
                                <span className='font-semibold text-[#78350F]'>
                                  {it.quantity}x
                                </span>{" "}
                                {it.name}
                              </div>
                            ))}
                          </div>
                          {order.notes && (
                            <div className='text-[11px] italic text-amber-900 bg-amber-100/50 p-1.5 rounded-lg mt-2'>
                              &bdquo;{order.notes}&rdquo;
                            </div>
                          )}
                        </td>
                        <td className='p-4 font-bold text-[#78350F]'>
                          {order.total} zł
                        </td>
                        <td className='p-4'>
                          <div className='flex items-center gap-1.5 text-xs text-amber-950/80'>
                            <MapPin size={13} className='text-amber-900/60' />
                            <span>{order.address}</span>
                          </div>
                          <div className='flex items-center gap-1.5 text-xs text-amber-950/80 mt-1'>
                            <Phone size={13} className='text-amber-900/60' />
                            <span>{order.phone}</span>
                          </div>
                        </td>
                        <td className='p-4'>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              order.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : order.status === "preparing"
                                  ? "bg-indigo-100 text-indigo-800 animate-pulse"
                                  : order.status === "delivered"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status === "pending"
                              ? "Nowe"
                              : order.status === "preparing"
                                ? "Kuchnia"
                                : order.status === "delivered"
                                  ? "Dostarczone"
                                  : "Anulowane"}
                          </span>
                        </td>
                        <td className='p-4 text-right'>
                          <div className='flex justify-end gap-1.5'>
                            {order.status === "pending" && (
                              <button
                                onClick={() =>
                                  updateOrderStatus(order.id, "preparing")
                                }
                                className='px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition'
                              >
                                Przyjmij do kuchni
                              </button>
                            )}
                            {order.status === "preparing" && (
                              <button
                                onClick={() =>
                                  updateOrderStatus(order.id, "delivered")
                                }
                                className='px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition'
                              >
                                Wydaj kurierowi
                              </button>
                            )}
                            {order.status !== "delivered" &&
                              order.status !== "cancelled" && (
                                <button
                                  onClick={() =>
                                    updateOrderStatus(order.id, "cancelled")
                                  }
                                  className='p-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs transition'
                                  title='Anuluj'
                                >
                                  <XCircle size={15} />
                                </button>
                              )}
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className='p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-xs transition'
                              title='Usuń zamówienie'
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "reservations" && (
          <div className='space-y-4'>
            {allReservations.length === 0 ? (
              <div className='text-center py-12 text-amber-950/40'>
                Brak rezerwacji w systemie.
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse min-w-[700px]'>
                  <thead>
                    <tr className='border-b border-amber-900/10 text-xs font-bold uppercase text-amber-900/60 bg-amber-500/5'>
                      <th className='p-4'>Rezerwujący</th>
                      <th className='p-4'>Kiedy</th>
                      <th className='p-4'>Liczba osób</th>
                      <th className='p-4'>Kontakt & Uwagi</th>
                      <th className='p-4'>Status</th>
                      <th className='p-4 text-right'>Akcja</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-amber-900/5 text-sm'>
                    {allReservations.map((res) => (
                      <tr
                        key={res.id}
                        className='hover:bg-amber-500/5 transition'
                      >
                        <td className='p-4 font-semibold text-[#4A2E1A]'>
                          <div>{res.userName}</div>
                          <div className='text-xs font-normal text-amber-950/50'>
                            {res.userEmail}
                          </div>
                        </td>
                        <td className='p-4'>
                          <div className='font-semibold text-[#4A2E1A]'>
                            {res.date}
                          </div>
                          <div className='text-xs text-[#78350F] font-bold'>
                            o godz. {res.time}
                          </div>
                        </td>
                        <td className='p-4 font-bold'>
                          {res.guests}{" "}
                          {res.guests === 1
                            ? "osoba"
                            : res.guests < 5
                              ? "osoby"
                              : "osób"}
                        </td>
                        <td className='p-4 max-w-[240px]'>
                          <div className='flex items-center gap-1.5 text-xs text-amber-950/80 mb-1'>
                            <Phone size={13} className='text-amber-900/60' />
                            <span>{res.phone}</span>
                          </div>
                          {res.notes && (
                            <div className='text-[11px] italic text-amber-900 bg-amber-100/50 p-1.5 rounded-lg'>
                              &bdquo;{res.notes}&rdquo;
                            </div>
                          )}
                        </td>
                        <td className='p-4'>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              res.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : res.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {res.status === "pending"
                              ? "Oczekuje"
                              : res.status === "confirmed"
                                ? "Zatwierdzona"
                                : "Anulowana"}
                          </span>
                        </td>
                        <td className='p-4 text-right'>
                          <div className='flex justify-end gap-1.5'>
                            {res.status === "pending" && (
                              <button
                                onClick={() =>
                                  updateReservationStatus(res.id, "confirmed")
                                }
                                className='px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition'
                              >
                                Zatwierdź rezerwację
                              </button>
                            )}
                            {res.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateReservationStatus(res.id, "cancelled")
                                }
                                className='p-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs transition'
                                title='Anuluj rezerwację'
                              >
                                <XCircle size={15} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReservation(res.id)}
                              className='p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-xs transition'
                              title='Usuń rezerwację'
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "add-item" && (
          <div className='max-w-2xl mx-auto'>
            <h3 className='font-serif text-xl font-bold text-[#4A2E1A] mb-4 flex items-center gap-2'>
              <PlusCircle className='text-[#78350F]' size={20} />
              Dodaj Nowe Danie do Karty
            </h3>

            {submitSuccess && (
              <div className='p-4 mb-6 text-sm text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200'>
                Wspaniale! Danie zostało pomyślnie dodane do bazy danych i jest
                widoczne dla klientów!
              </div>
            )}

            {submitError && (
              <div className='p-4 mb-6 text-sm text-red-800 bg-red-50 rounded-xl border border-red-200'>
                {submitError}
              </div>
            )}

            <form onSubmit={handleAddMenuItem} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1'>
                    Nazwa dania <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder='np. Pierogi z jagodami'
                    className='w-full px-3.5 py-2.5 bg-amber-100/10 border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm transition'
                  />
                </div>

                <div>
                  <label className='block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1'>
                    Cena (PLN) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    required
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    placeholder='np. 24'
                    className='w-full px-3.5 py-2.5 bg-amber-100/10 border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm transition'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1'>
                    Kategoria dania <span className='text-red-500'>*</span>
                  </label>
                  <select
                    value={itemCategory}
                    onChange={(e: any) => setItemCategory(e.target.value)}
                    className='w-full px-3.5 py-2.5 bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm transition'
                  >
                    <option value='soups'>Zupy (Soups)</option>
                    <option value='mains'>Dania Główne (Mains)</option>
                    <option value='desserts'>Desery (Desserts)</option>
                    <option value='drinks'>Napoje (Drinks)</option>
                  </select>
                </div>

                <div>
                  <label className='block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1'>
                    URL Obrazka (Opcjonalnie)
                  </label>
                  <input
                    type='url'
                    value={itemImage}
                    onChange={(e) => setItemImage(e.target.value)}
                    placeholder='Pozostaw puste dla losowego zdjęcia'
                    className='w-full px-3.5 py-2.5 bg-amber-100/10 border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm transition'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-amber-900/80 uppercase tracking-wider mb-1'>
                  Opis dania <span className='text-red-500'>*</span>
                </label>
                <textarea
                  required
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder='Napisz apetyczny opis, ze szczegółami o składnikach...'
                  className='w-full px-3.5 py-2.5 bg-amber-100/10 border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm transition h-24 resize-none'
                />
              </div>

              {/* Checkboxes */}
              <div className='flex gap-6 pt-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-amber-950 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className='w-4.5 h-4.5 rounded text-amber-800 focus:ring-amber-600 accent-amber-800'
                  />
                  <span>Danie polecane (Bestseller)</span>
                </label>

                <label className='flex items-center gap-2 text-sm font-semibold text-amber-950 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={isVegetarian}
                    onChange={(e) => setIsVegetarian(e.target.checked)}
                    className='w-4.5 h-4.5 rounded text-amber-800 focus:ring-amber-600 accent-amber-800'
                  />
                  <span>Danie wegetariańskie</span>
                </label>
              </div>

              <button
                type='submit'
                className='w-full py-3 bg-[#78350F] hover:bg-[#5C230A] text-white font-semibold rounded-xl shadow-md transition'
              >
                Dodaj Danie do Karty
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
