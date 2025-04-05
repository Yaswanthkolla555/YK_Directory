import Form  from "next/form"
import SearchFormReset from "./SearchFormReset"
import { Search } from "lucide-react"
const SearchForm = ({query}:{query?:string}) => {
  return (
    // this is in server side rendering so we need to use form component in client side rendering
    <Form action="/" scroll={false} className="search-form text-black">
        <input name="query"
        defaultValue=""
        className="search-input"
        placeholder="Search-Startups" />
        
        <div className="flex gap-2">
            {query && <SearchFormReset/>}
            <button type="submit" className="search-btn text-white">
                <Search className="size-5"/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm