const rank1 = 'best'
const rank2 = 'good'

// action
function fetchCouponsFromDB() {
  fetch('http://localhost:3001/coupons')
    .then(res => res.json())
    .then(data => data)
}

// action
function fetchSubscribersFromDB() {
  fetch('http://localhost:3001/subscribers')
    .then(res => res.json())
    .then(data => data)
}

// calculate
// 쿠폰 등급을 결정하는 함수
function subCouponRank(subscriber) {
  if (subscriber.rec_count >= 10) {
    return 'best'
  } else {
    return 'good'
  }
}

// calculate
// 특정 등급의 쿠폰 목록을 선택하는 계산
function selectCouponsByRank(coupons, rank) {
  const ret = []

  for (let i = 0; i < coupons.length; i++) {
    const coupon = coupons[i]

    if (coupon.rank === rank) {
      ret.push(coupon)
    }
  }

  return ret
}

// email data
const messages = [
  // {
  //   from: 'newsletter@coupondong.co',
  //   to: 'sam@pmail.com',
  //   subject: 'Your weekly coupons inside',
  //   body: 'Here are your coupons ...'
  // }
]

// calculate
// 구독자가 받을 이메일을 계획하는 계산
function emailForSubscriber(subscriber, goods, bests) {
  const rank = subCouponRank(subscriber)

  if (rank === 'best') {
    return {
      from: 'newsletter@coupondong.co',
      to: subscriber.email,
      subject: 'Your best weekly coupons inside',
      body: 'Here are your coupons: ' + bests.join(', ')
    }
  } else {
    return {
      from: 'newsletter@coupondong.co',
      to: subscriber.email,
      subject: 'Your good weekly coupons inside',
      body: 'Here are your coupons: ' + goods.join(', ')
    }
  }
}

// calculate
// 보낼 이메일 목록을 준비하기
function emailForSubscribers(subscribers, goods, bests) {
  const emails = []

  for (let i = 0; i < subscribers.length; i++) {
    const subscriber = subscribers[i]
    const email = emailForSubscriber(subscriber, goods, bests)

    emails.push(email)
  }

  return emails
}

// actions
// 이메일 보내기
function sendIssue() {
  const coupons = fetchCouponsFromDB()
  const goodCoupons = selectCouponsByRank(coupons, rank2)
  const bestCoupons = selectCouponsByRank(coupons, rank1)
  const subscribers = fetchSubscribersFromDB()
  const emails = emailForSubscribers(subscribers, goodCoupons, bestCoupons)

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i]
    emailSystem.send(email)
  }
}

function sendIssue2() {
  const coupons = fetchCouponsFromDB()
  const goodCoupons = selectCouponsByRank(coupons, rank2)
  const bestCoupons = selectCouponsByRank(coupons, rank1)
  const page = 0
  const subscribers = fetchSubscribersFromDB(page)

  while (subscribers.length > 0) {
    const emails = emailForSubscribers(subscribers, goodCoupons, bestCoupons)

    for (let i = 0; i < emails.length; i++) {
      const email = emails[i]
      emailSystem.send(email)
    }

    page++
    subscribers = fetchSubscribersFromDB(page)
  }
}
