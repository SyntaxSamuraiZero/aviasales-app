function filterAndSortTickets(tickets, checkedList, sortType) {
  const matchesFilter = (stopsCount) => {
    if (stopsCount === 0 && checkedList.includes('Без пересадок')) return true
    if (stopsCount === 1 && checkedList.includes('1 пересадка')) return true
    if (stopsCount === 2 && checkedList.includes('2 пересадки')) return true
    if (stopsCount === 3 && checkedList.includes('3 пересадки')) return true
    return false
  }

  return tickets
    .filter((ticket) => {
      const matchesSegment0 = matchesFilter(ticket.segments[0].stops.length)
      const matchesSegment1 = matchesFilter(ticket.segments[1].stops.length)

      return matchesSegment0 || matchesSegment1
    })
    .sort((a, b) => {
      if (sortType === 'cheapest') {
        return a.price - b.price
      }
      if (sortType === 'fastest') {
        const durationA = a.segments[0].duration + a.segments[1].duration
        const durationB = b.segments[0].duration + b.segments[1].duration
        return durationA - durationB
      }
      return 0
    })
}

export default filterAndSortTickets
