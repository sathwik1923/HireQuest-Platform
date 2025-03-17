import { getJobs } from "@/api/apiJobs"; 
import useFetch from "@/hooks/use-fetch"; 
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { getCompanies } from "@/api/apiCompanies";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
    const [searchQuery, setSearchQuery] = useState(""); 
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState(""); 
    const { isLoaded } = useUser();
    
    const {
        fn: fnJobs,
        data: jobs,
        loading: loadingJobs,
    } = useFetch(getJobs, {
        location,
        company_id,
        searchQuery,
    });

    const {
        data: companies,
        fn: fnCompanies,
    } = useFetch(getCompanies);

    useEffect(() => {
        if (isLoaded) {
            fnCompanies();
        }
    }, [isLoaded]);

    console.log(jobs);

    useEffect(() => {
        if (isLoaded) fnJobs();
    }, [isLoaded, location, company_id, searchQuery]);

    const handleSearch = (e) => {
      e.preventDefault();
      let formData = new FormData(e.target);
  
      const query = formData.get("search-query");
      if (query) setSearchQuery(query);
    };

    const clearFilters = () => {
      setSearchQuery("");
      setCompany_id("");
      setLocation("");
    };
  
  

    if (!isLoaded) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
    }

    return (
        <div>
            <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
                Latest Jobs
            </h1>

            <form
                onSubmit={handleSearch}
                className="h-12 flex flex-row w-full gap-2 items-center mb-4"
            >
                <Input
                    type="text"
                    placeholder="Search Jobs by Title.."
                    name="search-query"
                    className="h-full flex-1 px-3 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="h-full sm:w-24" variant="blue">
                    Search
                </Button>
            </form>
            <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

            {loadingJobs && (
                <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}

            {!loadingJobs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
                    {jobs?.map((job) => (
                        <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
                        
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobListing;
