```typescript
class DiscountCondition {
  #type: DiscountConditionType
  #sequence: number
  #dayOfWeek: DayOfWeek
  #startTime: Date
  #endTime: Date

  getType(): DiscountConditionType {
    return this.#type
  }

  isDiscountable(dayOfWeek: DayOfWeek, time: Date) {
    if (this.type !== 'PERIOD') {
      throw new Error('Invalid argument')
    }

    const startTime = this._parseTime(this.startTime)
    const endTime = this._parseTime(this.endTime)
    const currentTime = this._parseTime(time)

    return (
      this.dayOfWeek === dayOfWeek &&
      currentTime >= startTime &&
      currentTime < endTime
    )
  }

  isDiscountableSequence(sequence: number) {
    if (this.type !== 'SEQUENCE') {
      throw new Error('Invalid argument')
    }

    return this.sequence === sequence
  }

  #parseTime(time: Date) {
    const hours = time.getHours()
    const minutes = time.getMinutes()

    return hours * 60 + minutes
  }
}
```

```typescript
class Movie {
  #title: string
  #runningTime: number
  #fee: Money
  #discountConditions: DiscountCondition[]

  #movieType: MovieType
  #discountAmount: Money
  #discountPercent: number

  getMovieType(): MovieType {
    return this.#movieType
  }

  calculateAmountDiscountedFee(): Money {
    if (this.#movieType !== 'AMOUNT_DISCOUNT') {
      throw new Error('Invalid movie type')
    }

    return this.#fee.minus(this.#discountAmount)
  }

  calculatePercentDiscountedFee(): Money {
    if (this.#movieType !== 'PERCENT_DISCOUNT') {
      throw new Error('Invalid movie type')
    }

    return this.#fee.minus(this.#fee.times(this.#discountPercent))
  }

  calculateNoneDiscountedFee(): Money {
    if (this.#movieType !== 'NONE_DISCOUNT') {
      throw new Error('Invalid movie type')
    }

    return this.#fee
  }

  isDiscountable(whenScreened: Date, sequence: number): boolean {
    for (const condition of this.#discountConditions) {
      if (condition.getType() === 'PERIOD') {
        if (condition.isDiscountable(whenScreened.getDay(), whenScreened)) {
          return true
        }
      } else {
        if (condition.isDiscountableSequence(sequence)) {
          return true
        }
      }
    }

    return false
  }
}
```

```typescript
class Screening {
  #movie: Movie
  #sequence: number
  #whenScreened: Date

  constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.#movie = movie
    this.#sequence = sequence
    this.#whenScreened = whenScreened
  }

  calculateFee(audienceCount: number) {
    switch (this.#movie.getMovieType()) {
      case 'AMOUNT_DISCOUNT':
        if (this.#movie.isDiscountable(this.#whenScreened, this.#sequence)) {
          return this.#movie.calculateAmountDiscountedFee().times(audienceCount)
        }
        break
      case 'PERCENT_DISCOUNT':
        if (this.#movie.isDiscountable(this.#whenScreened, this.#sequence)) {
          return this.#movie
            .calculatePercentDiscountedFee()
            .times(audienceCount)
        }
        break
      case 'NONE_DISCOUNT':
        return this.#movie.calculateNoneDiscountedFee().times(audienceCount)
    }

    return this.#movie.calculateNoneDiscountedFee().times(audienceCount)
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
    const fee = screening.calculateFee(audienceCount)

    return new Reservation(customer, screening, fee, audienceCount)
  }
}
```
