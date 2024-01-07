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
  #ticket
  #invitation

  hold(ticket) {
    if (this.#hasInvitation()) {
      this.#setTicket(ticket)
      return 0
    } else {
      this.#setTicket(ticket)
      this.#minusAmount(ticket.getFee())
      return ticket.getFee()
    }
  }

  #setTicket(ticket) {
    this.#ticket = ticket
  }

  #hasInvitation() {
    return this.#invitation !== null
  }

  #minusAmount(amount) {
    this.#amount -= amount
  }
}

class Audience {
  // 관람객은 소지품 보관을 위해 가방을 소지할 수 있다.
  #bag

  constructor(bag) {
    this.#bag = bag
  }

  buy(ticket) {
    return this.#bag.hold(ticket)
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

  #getTicket() {
    return this.#tickets.pop()
  }

  #plusAmount(amount) {
    this.#amount += amount
  }

  minusAmount(amount) {
    this.#amount -= amount
  }

  sellTicketTo(audience) {
    this.#plusAmount(audience.buy(this.#getTicket()))
  }
}

class TicketSeller {
  #ticketOffice

  constructor(ticketOffice) {
    this.#ticketOffice = ticketOffice
  }

  settTo(audience) {
    this.#ticketOffice.sellTicketTo(audience)
  }
}
// TicketSeller는 ticketOffice에서 티켓을 꺼내거나 판매 요금을 적립하는 일을 스스로 수행한다.
// 이처럼 개념적이나 물리적으로 객체 내부의 세부적인 사항을 감추는 것을 캡슐화(encapsulation)라고 부른다.

class Theater {
  #ticketSeller

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller
  }

  enter(audience) {
    this.#ticketSeller.settTo(audience)
  }
}
// 어디에서도 ticketOffice에 접근하지 않는다.
