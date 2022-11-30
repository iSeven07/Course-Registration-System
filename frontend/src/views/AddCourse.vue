<template>
    <div class="d-flex justify-content-center p-5 text-center">

        <div class="pt-5">
            <div class="h3">
                Add Course
            </div>
            <form>
                <div class="form-row mt-5">
                    <div class="col">
                        <label for="courseName">Course Name</label>
                        <input type="text" class="form-control" id="courseName">
                    </div>
                    <div class="col">
                        <label for="courseTitle">Course Title</label>
                        <input type="text" class="form-control" id="courseTitle">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-5">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        
    ]
}
</script>