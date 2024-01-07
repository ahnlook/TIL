import {
  Theater,
  TicketSeller,
  TicketOffice,
  Audience,
  Bag,
  Ticket,
  Invitation
} from './after.js'

describe('Theater System', () => {
  test('Audience without invitation should pay for the ticket', () => {
    const ticket = new Ticket(100) // 티켓 가격 100
    const bag = new Bag(1000) // 가방에 1000의 금액
    const audience = new Audience(bag)
    audience.buy(ticket)

    expect(bag.amount).toBe(900) // 1000 - 100 = 900
  })

  test('Audience with invitation should not pay for the ticket', () => {
    const ticket = new Ticket(100)
    const invitation = new Invitation() // 초대장 추가
    const bag = new Bag(1000, invitation) // 초대장을 가진 가방
    const audience = new Audience(bag)
    audience.buy(ticket)

    expect(bag.amount).toBe(1000) // 금액은 변하지 않아야 함
  })

  test('TicketOffice sells a ticket and increases its amount', () => {
    const ticketOffice = new TicketOffice(
      1000,
      new Ticket(100),
      new Ticket(100)
    )
    const bag = new Bag(1000)
    const audience = new Audience(bag)

    ticketOffice.sellTicketTo(audience)

    expect(ticketOffice.amount).toBe(1100) // 1000 + 100 = 1100
    expect(ticketOffice.tickets.length).toBe(1) // 티켓 하나가 판매되었으므로
  })

  test('Theater allows audience to enter', () => {
    const ticketOffice = new TicketOffice(1000, new Ticket(100))
    const ticketSeller = new TicketSeller(ticketOffice)
    const theater = new Theater(ticketSeller)

    const bag = new Bag(1000)
    const audience = new Audience(bag)

    theater.enter(audience)

    expect(ticketOffice.amount).toBe(1100) // 관람객이 티켓을 구매함
  })
})
