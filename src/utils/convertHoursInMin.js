module.exports = {
  convertHourInMin(time) {
    const [hour, min] = time.split(':').map(Number)
    const timeInMinutes = hour * 60 + min

    return timeInMinutes
  }
}
