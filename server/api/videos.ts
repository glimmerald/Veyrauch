import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  // Путь к папке с видео внутри директории public
  const publicDir = path.join(process.cwd(), 'public', 'pressed_no_audio')
  
  try {
    const files = await fs.readdir(publicDir)
    
    // Фильтруем только видеофайлы
    const videos = files
      .filter(f => f.endsWith('.mp4') || f.endsWith('.webm') || f.endsWith('.mov'))
      .map(f => `/pressed_no_audio/${f}`)
      
    return videos
  } catch (error) {
    console.error('Ошибка чтения папки с видео:', error)
    return []
  }
})
