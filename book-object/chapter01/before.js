// 초대장
class Invitation {
  // 초대일자
  #when
}

class Ticket {
  #fee

  getFeet() {
    return this.#fee
  }
}

class Bag {
  #amount
  #invitation
  #ticket

  constructor(invitation, amount) {
    if (arguments.length === 1) {
      amount = invitation
      invitation = null
    }

    this.invitation = invitation
    this.amount = amount
  }

  hasInvitation() {
    return this.#invitation !== null
  }

  hasTicket() {
    return this.#ticket !== null
  }

  setTicket(ticket) {
    this.#ticket = ticket
  }

  minusAmount(amount) {
    this.#amount -= amount
  }

  plusAmount(amount) {
    this.#amount += amount
  }
}

class Audience {
  // 관람객은 소지품 보관을 위해 가방을 소지할 수 있다.
  #bag

  constructor(bag) {
    this.#bag = bag
  }

  getBag() {
    return this.#bag
  }
}

class TicketOffice {
  // 판매금액
  #amount
  #tickets = [] // 판매하거나 교환할 티켓의 목록

  constructor(amount, ...tickets) {
    this.#amount = amount
    this.#tickets = tickets
  }

  getTicket() {
    return this.#tickets.pop()
  }

  minusAmount(amount) {
    this.#amount -= amount
  }

  plusAmount(amount) {
    this.#amount += amount
  }
}

class TicketSeller {
  #ticketOffice

  constructor(ticketOffice) {
    this.#ticketOffice = ticketOffice
  }

  getTicketOffice() {
    return this.#ticketOffice
  }
}

class Theater {
  #ticketSeller

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller
  }

  enter(audience) {
    if (audience.getBag().hasInvitation()) {
      const ticket = this.#ticketSeller.getTicketOffice().getTicket()
      audience.getBag().setTicket(ticket)
    } else {
      const ticket = this.#ticketSeller.getTicketOffice().getTicket()
      audience.getBag().minusAmount(ticket.getFee())
      this.#ticketSeller.getTicketOffice().plusAmount(ticket.getFee())
      audience.getBag().setTicket(ticket)
    }
  }
}
