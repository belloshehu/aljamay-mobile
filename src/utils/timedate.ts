export const formatDate = (date: string) => {
  return new Date(date).toDateString()
}

export const formatToYearMonthDay = (date: Date) => {
  return date.toISOString().split("T")[0]
}
