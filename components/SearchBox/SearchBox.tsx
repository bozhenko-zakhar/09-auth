import css from './SearchBox.module.css'

interface SearchBoxProps {
	value: string;
	onChange: (query: string) => void
}

export default function SearchBox({value, onChange}: SearchBoxProps) {

	function queryHandler(event: React.ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value)
	}

  return (
    <input
			onChange={queryHandler}
			className={css.input}
			value={value}
			type="text"
			placeholder="Search notes"
		/>
  )
}