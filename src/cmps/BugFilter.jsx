import { utilService } from "../services/util.service"
import { useEffect, useState, useRef } from 'react'

  const labels = [
    "backend",
    "API",
    "user-data",
    "critical",
    "database",
    "network",
    "frontend",
    "UI",
    "event-listener",
    "performance",
    "memory",
    "auth",
    "token",
    "config",
    "notifications",
    "error-handling",
    "triage",
    "new",
    "pending"
  ]


export function BugFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy})
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 300)).current

        useEffect(() => {
            onSetFilterDebounce(filterByToEdit)
        },[filterByToEdit])

        function handleChange({ target }) {
            let { value, name: field, type } = target
            value = type === 'number' ? +value : value
            if (field === 'sortDir') value = +value
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        }  

        function handleMultiSelect({ target }) {
            const selectedOptions = Array.from(target.selectedOptions, option => option.value)
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedOptions }))
        }

        return(
            <section className="bug-filter">
            <h3>Filter Bugs 🐞</h3>
            <form >
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text"
                        id="title"
                        name="txt"
                        placeholder="By title"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="minSeverity">Min severity:</label>
                    <input type="number"
                        id="minSverity"
                        name="minSeverity"
                        placeholder="By min Severity"
                        value={filterByToEdit.minSeverity || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Labels:</label>
                    <select multiple name="labels" value={filterByToEdit.labels} onChange={handleMultiSelect}>
                        {labels.map(label => (
                        <option key={label} value={label}>{label}</option>
                            ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sortBy">Sort By:</label>
                    <select
                        id="sortBy"
                        name="sortBy"
                        value={filterByToEdit.sortBy || ''}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        <option value="title">Title</option>
                        <option value="severity">Severity</option>
                        <option value="createdAt">Created At</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sortDir">Sort Direction:</label>
                    <select
                        id="sortDir"
                        name="sortDir"
                        value={filterByToEdit.sortDir || 1}
                        onChange={handleChange}
                    >
                        <option value="1">Ascending</option>
                        <option value="-1">Descending</option>
                    </select>
                </div>
            </form>

            </section>
        )
        
}

