```typescript
enum MovieType {
  AMOUNT_DISCOUNT,
  PERCENT_DISCOUNT,
  NONE_DISCOUNT
}

class Movie {
  #title: string
  #runningTime: Duration
  #fee: Money
  #discountConditions: DiscountCondition[]

  #movieType: MovieType
  #discountAmount: DiscountAmount
  #discountPercent: DiscountPercent
}

class Movie {
  getMovieType(): MovieType {
    return this.#movieType
  }

  setMovieType(movieType: MovieType): void {
    this.#movieType = movieType
  }

  getFee(): Money {
    return this.#fee
  }

  setFee(fee: Money): void {
    this.#fee = fee
  }

  getDiscountConditions(): ReadonlyArray<DiscountCondition> {
    return [...this.discountConditions]
  }

  setDiscountConditions(discountConditions: DiscountCondition[]): void {
    this.#discountConditions = discountConditions
  }

  getDiscountAmount(): DiscountAmount {
    return this.#discountAmount
  }

  setDiscountAmount(discountAmount: DiscountAmount): void {
    this.#discountAmount = discountAmount
  }

  getDiscountPercent(): number {
    return this.discountPercent
  }

  setDiscountPercent(discountPercent: number): void {
    this.discountPercent = discountPercent
  }
}
```

```typescript
enum DiscountConditionType {
  SEQUENCE,
  PERIOD
}

class DiscountCondition {
  #type: DiscountConditionType
  #sequence: number
  #dayOfWeek: DayOfWeek
  #startTime: Date
  #endTime: Date

  getType(): DiscountConditionType {
    return this.#type
  }

  setType(type: DiscountConditionType): void {
    this.#type = type
  }

  getDayOfWeek(): DayOfWeek {
    return this.#dayOfWeek
  }

  getStartTime(): Date {
    return this.#startTime
  }

  setStartTime(startTime: Date): void {
    this.#startTime = startTime
  }

  getEndTime(): Date {
    return this.#endTime
  }

  setEndTime(endTime: Date): void {
    this.#endTime = endTime
  }

  getSequence(): number {
    return this.#sequence
  }

  setSequence(sequence: number): void {
    this.#sequence = sequence
  }
}
```

```typescript
class Screening {
  #movie: Movie
  #sequence: number
  #whenScreened: Date

  getMovie(): Movie {
    return this.#movie
  }

  setMovie(movie: Movie): void {
    this.#movie = movie
  }

  getWhenScreened(): Date {
    return this.#whenScreened
  }

  setWhenScreened(whenScreened: Date): void {
    this.#whenScreened = whenScreened
  }

  getSequence(): number {
    return this.#sequence
  }

  setSequence(sequence: number): void {
    this.#sequence = sequence
  }
}
```

```typescript
class Reservation {
  #customer: Customer
  #screening: Screening
  #fee: Money
  #audienceCount: number

  constructor(
    customer: Customer,
    screening: Screening,
    fee: Money,
    audienceCount: number
  ) {
    this.#customer = customer
    this.#screening = screening
    this.#fee = fee
    this.#audienceCount = audienceCount
  }

  getCustomer(): Customer {
    return this.#customer
  }

  setCustomer(customer: Customer): void {
    this.#customer = customer
  }

  getScreening(): Screening {
    return this.#screening
  }

  setScreening(screening: Screening): void {
    this.#screening = screening
  }

  getFee(): Money {
    return this.#fee
  }

  setFee(fee: Money): void {
    this.#fee = fee
  }

  getAudienceCount(): number {
    return this.#audienceCount
  }

  setAudienceCount(audienceCount: number): void {
    this.#audienceCount = audienceCount
  }
}
```

```typescript
class Customer {
  #name: string
  #id: string

  constructor(name: string, id: string) {
    this.#name = name
    this.#id = id
  }
}
```

```typescript
class ReservationAgency {
  reserve(
    screening: Screening,
    customer: Customer,
    audienceCount: number
  ): Reservation {
    const movie: Movie = screening.getMovie()

    let discountable: boolean = false
    for (const condition of movie.getDiscountConditions()) {
      if (condition.getType() === DiscountConditionType.PERIOD) {
        discountable =
          screening.getWhenScreened().getDay() === condition.getDayOfWeek() &&
          condition.getStartTime() <= screening.getWhenScreened() &&
          condition.getEndTime() >= screening.getWhenScreened()
      } else {
        discountable = condition.getSequence() === screening.getSequence()
      }

      if (discountable) {
        break
      }
    }

    let fee: Money
    if (discountable) {
      let discountAmount: DiscountAmount = movie.getDiscountAmount()
      if (discountAmount !== null) {
        fee = movie.getFee().minus(discountAmount)
      } else {
        fee = movie
          .getFee()
          .minus(movie.getFee().times(movie.getDiscountPercent()))
      }
    } else {
      fee = movie.getFee()
    }

    return new Reservation(customer, screening, fee, audienceCount)
  }
}
```
