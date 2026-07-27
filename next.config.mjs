/** @type {import('next').NextConfig} */
const nextConfig = {
  // drei's <Scroll html> gives itself a React root through useMemo, which
  // StrictMode double-invokes in dev, so createRoot fires twice on the same
  // container. Nothing is wrong at runtime, but the overlay is unusable.
  reactStrictMode: false,
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:file(.*\\.glb|.*\\.gltf|.*\\.hdr|.*\\.mp3)",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ]
  },
}

export default nextConfig
