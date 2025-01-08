import { Button, Chip, createTheme, Grid2, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProjects } from "../hooks/useRecentProjects";
import SearchpageProjectCard from "../components/ProjectCards/SearchpageProjectCard";
import { ProjectConfiguration } from "../contexts/CreateProjectContext";
import { getProjectConfiguration, getSpecificProjects } from "../utils/projectsApi";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#0056b3' },
        secondary: { main: '#3d3d3d' },
        background: { default: '#2a2a2a', paper: '#333333' },
        text: { primary: '#d8d8d8', secondary: '#b0b0b0' },
      },
});


const Searchpage: React.FC = () => {
    const { projects, isLoading, error } = useProjects(); // TODO: Change this to suitable API later
    const [ isContentVisible, setIsContentVisible ] = useState<boolean>(false);
    const [ projectConfig, setProjConfig ] = useState<ProjectConfiguration | null>(null);

    const [ selectedTags, setNewTags ] = useState<string[] | undefined>(undefined);
    const [ selectedCategories, setNewCategories ] = useState<string[] | undefined>(undefined);
    const [ searchBarInput, setNewInput ] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchTagsAndCategories =  async () => {
            try {
                const data = await getProjectConfiguration();
                setProjConfig(data);
            } catch (err: any) {
                console.log('err', err);
            }
        }

        fetchTagsAndCategories();
        //if (!isLoading) {
        //  setIsContentVisible(true);
        //} else {
        //  setIsContentVisible(false);
        //}
    }, [isLoading]);

    const handleSelectTag = (handledTag: string) => {
        const isSelected = selectedTags?.includes(handledTag);
        if (selectedTags?.length > 0) {
            setNewTags(isSelected ? selectedTags?.filter((t) => t !== handledTag) : selectedTags?.concat([handledTag]))
        } else {
            setNewTags([handledTag]);
        }
    };

    const handleSelectCategory = (handledCategory: string) => {
        const isSelected = selectedCategories?.includes(handledCategory);
        if (selectedCategories?.length > 0) {
            setNewCategories(isSelected ? selectedCategories?.filter((c) => c !== handledCategory) : selectedCategories?.concat([handledCategory]));
        } else {
            setNewCategories([handledCategory]);
        }
    };

    const handleNewInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "Search") {
            setNewInput(value);
        }
    };

    const askForResults = () => {
        setIsContentVisible(false);
        const askingData = {
            categories: selectedCategories,
            tags: selectedTags,
            searchedText: searchBarInput,
        }

        console.log(askingData);
        //TODO: Ask Database for results

        //getSpecificProjects(askingData);
    };

    return (
        <div style={{marginLeft: "50px", marginRight: "50px"}}>
            <ThemeProvider theme={theme}>
                <div className="searchBar">
                    <TextField
                        variant="filled"
                        label="Search Bar"
                        name="Search"
                        fullWidth
                        sx={{
                            bgcolor: 'secondary'
                        }}
                        onChange={handleNewInput}
                    />
                </div>
                <div className="categories-list" style={{margin: "5px"}}>
                    <h3 style={{textAlign: "center"}}>Select categories:</h3>
                    <Grid2 container spacing={2} sx={{
                        border: 2, 
                        borderColor: 'secondary.main', 
                        borderRadius: 2, 
                        p: 2, 
                        justifyContent: "center", 
                        alignItems: "center"}}>
                        {!isLoading ? projectConfig?.categories.map((availableCategory) => (
                            <Chip 
                                label={availableCategory}
                                clickable
                                color={selectedCategories?.includes(availableCategory) ? 'primary' : 'default'}
                                onClick={() => handleSelectCategory(availableCategory)}
                        />
                        )) : <p>No categories available.</p>}
                    </Grid2>
                </div>
                <div className="tags-list" style={{margin: "5px"}}>
                    <h3 style={{textAlign: "center"}}>Select tags:</h3>
                    <Grid2 container spacing={2} sx={{
                        border: 2, 
                        borderColor: 'secondary.main', 
                        borderRadius: 2, 
                        p: 2, 
                        justifyContent: "center", 
                        alignItems: "center"}}>
                        {!isLoading ? projectConfig?.tags.map((availableTag) => (
                            <Chip 
                                label={availableTag}
                                clickable
                                color={selectedTags?.includes(availableTag) ? 'primary' : 'default'}
                                onClick={() => handleSelectTag(availableTag)}
                            />
                        )) : <p>No tags available.</p>}
                    </Grid2>
                </div>
                <div className="search-results" style={{margin: "5px"}}>
                    <Button 
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2}}
                        onClick={(e) => {
                            e.preventDefault();
                            askForResults();
                            setIsContentVisible(true);
                        }}
                        >Search</Button>
                    {isContentVisible && (!isLoading && !error && projects.length > 0 ? ( 
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                        justifyContent: "center",
                        alignContent: "center",
                        padding: "20px",
                        margin: "0 auto"
                    }}>
                        {projects.map((searchResult) => (
                            <SearchpageProjectCard key={searchResult.Id} project={searchResult} />
                        ))}
                    </div>
                    ) : (
                        !isLoading && <p>No projects found.</p>
                    ))}
                    {error && <p>Error: {error}</p>}
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Searchpage;