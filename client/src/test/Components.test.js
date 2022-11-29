import { render, screen } from '@testing-library/react'
import Title from '../components/home/title'

describe('Components render', () => {
    test('Render Title component', () => {
        const title = 'Ocean Chat'
        render(<Title title={title} />)
        const titleElement = screen.getByText(title)
        expect(titleElement).toBeInTheDocument()
    })

    test('Render Button', () => {
        const title = 'Ocean Chat'
        render(<Title title={title} />)
        const titleElement = screen.getByText(title)
        expect(titleElement).toBeInTheDocument()
    })
})