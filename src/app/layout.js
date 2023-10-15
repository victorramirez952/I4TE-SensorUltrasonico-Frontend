import './globals.css'
export const metadata = {
  title: 'Sensor ultrásonico',
  description: 'Academic project app for IoT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
