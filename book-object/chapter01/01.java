public class Bag {
  public Bag(long amount) {
    this(null, amount)
  }

  public Bag(Invitation invitation, long amount) {
    this.invitation = invitation
    this.amount = amount
  }
}

public class TicketOffice {
  private Long amount
  private List<Ticket> tickets = new ArrayList<>();

  public TicketOffice(Long amount, Ticket ... tickets) {
    this.amount = amount
    this.tickets.addAll(Arrays.asList(tickets))
  }
}