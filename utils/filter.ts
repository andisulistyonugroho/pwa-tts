export function formatDate(string: string) {
  if (!string) {
    return '-'
  }
  const { $dayjs } = useNuxtApp()
  return $dayjs(string).format('DD MMM YYYY HH:mm:ss')
}

export function toCurrency(val: number) {
  var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  return formatter.format(val);
}

export function toMoney(val: number) {
  if (val) {
    const x = val
    return x.toLocaleString('id-ID')
  } else {
    return '-'
  }
}

export function toDate(string: string) {
  if (!string) {
    return '-'
  }
  const { $dayjs } = useNuxtApp()
  return $dayjs(string).format('DD MMM YYYY')
}

export function toMonth(string: string) {
  if (!string) {
    return
  }
  const { $dayjs } = useNuxtApp()
  return $dayjs(string).format('MMMM YYYY')
}

export function truncateTitle(val: string) {
  if (!val) {
    return ''
  }
  const string = val.length > 80 ? val.substring(0, 77) + '...' : val
  return string
}

export function toDuration(val: number) {
  if (!val) return 0

  const { $dayjs } = useNuxtApp()
  const theDuration = $dayjs.duration(val)
  return theDuration.minutes() + ' mnt ' + theDuration.seconds() + ' dtk'

}