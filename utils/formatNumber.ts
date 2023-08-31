const formatNumber = (n: number): string => {
    if (!Number(n)) {
        return "0"
    }

    const k = 1_000
    const m = 1_000_000

    if (n >= m) {
        return (n / m).toFixed(1) + 'm'
    } else if (n >= k) {
        return (n / k).toFixed(1) + 'k'
    } else {
        return n.toString()
    }
}

export default formatNumber