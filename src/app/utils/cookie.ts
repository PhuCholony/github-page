export class Cookie {
  static get(name: string): string | null {
    // Split cookie string into individual name=value pairs
    const cookies = document.cookie.split(';')

    // Loop through each cookie
    for (const cookie of cookies) {
      // Check if this cookie string begins with the name we want
      if (cookie.trim().startsWith(name + '=')) {
        // Return the cookie value decoded
        return decodeURIComponent(cookie.substring(name.length + 1))
      }
    }

    // Return null if the cookie wasn't found
    return null
  }
}
