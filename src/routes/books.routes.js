import { Router } from 'express'
import {
    getBooks,
    getBook,
    getChapter,
    getVerse,
    getRange,
} from '../controllers/books.controller.js'

export const router = Router()

router.get("/", getBooks)
router.get("/:book", getBook)
router.get("/:book/chapters/:chapter", getChapter)
router.get("/:book/chapters/:chapter/verses/:verse", getVerse)
router.get("/:book/chapters/:chapter/range", getRange)
