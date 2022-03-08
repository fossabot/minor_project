import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import Select from "react-select";

import axios from "axios";

import { useForm, Controller } from "react-hook-form";

import styles from "./Login.module.scss";
import { useSelector } from "react-redux";

const PostJob = () => {
  const [categoryArr, setCategoryArr] = useState([]);
  const [skillArr, setSkillArr] = useState([]);
  const uid = useSelector((state) => state.auth.user?.id);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      project_title: "",
      project_description: "",
      project_length: null,
      budget_min: null,
      budget_max: null,
      bid_deadline: null,
      job_category: null,
      projectFile: "",
      skills: [],
      creator: uid,
    },
  });

  const fetchCategory = async () => {
    const responseCategory = await axios.get("/api/categories/");
    setCategoryArr(responseCategory.data);
    // try {
    //   // const responseUser = await axios.get(
    //   //   `/users/${responseProfile.data.user}`
    //   // );

    //   // setUser(responseUser.data);
    //   // setProfile(responseProfile.data);
    // } catch (error) {
    //   setError(true);
    //   console.log("Server error");
    // }
    // setLoading(false);
  };

  const fetchSkills = async () => {
    const responseSkills = await axios.get("/api/skills/");
    // console.log(categoryArr);
    // const skillsInProject = responseSkills.data.filter((item)=>categoryArr["skills"].includes(item.id))
    setSkillArr(responseSkills.data);
  };

  const registerJob = async (formData) => {
    const skillFromForm = formData["skills"];
    const projectCatFromForm = formData["job_category"];
    const skillIdArr = skillFromForm.map((item) => item.id);
    formData.job_category = projectCatFromForm.id;
    const fData = new FormData();
    fData.append(
      "projectFile",
      formData.projectFile?.length === 0 ? "" : formData.projectFile[0]
    );
    fData.append("project_title", formData.project_title);
    fData.append("job_category", formData.job_category);
    fData.append("project_length", formData.project_length);
    fData.append("budget_min", formData.budget_min);
    fData.append("budget_max", formData.budget_max);
    fData.append("bid_deadline", formData.bid_deadline);
    fData.append("project_description", formData.project_description);

    // skillIdArr.forEach((item) => fData.append("skills", JSON.stringify(item)));
    fData.append("skills", skillIdArr);
    fData.append("creator", uid);
    console.log(fData);

    try {
      const response = await axios.post("/api/postJob/", fData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchSkills();
  }, []);

  // This is used to reset the form on succesful submission
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        if (
          data.projectFile.length !== 0 &&
          data.projectFile[0]?.size > 1 * 1024 * 1024
        ) {
          alert("File size shouldn't exceed 1MB");
        } else {
          registerJob(data);
        }
        // Later will be handled for fetching data from database
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='kamao'>
            Kamao
          </h2>
          <span>Project Posting</span>
        </div>
        <div className={styles.login__description}>
          <LoginInput
            type='text'
            name='project_title'
            placeholder='Enter the project title'
            register={register}
            errors={errors}
          />

          <Controller
            name='job_category'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles["form-control"]}
                placeholder='Select project category'
                getOptionLabel={(option) => option.job_name}
                getOptionValue={(option) => option.id}
                options={categoryArr}
              />
            )}
            rules={{ required: true }}
          />
          {errors.job_category && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}

          <LoginInput
            type='number'
            name='project_length'
            placeholder='Project length in months'
            register={register}
            errors={errors}
          />

          <LoginInput
            type='number'
            name='budget_min'
            placeholder='Enter the minimum budget'
            register={register}
            errors={errors}
          />

          <LoginInput
            type='number'
            name='budget_max'
            placeholder='Enter the maximum budget'
            register={register}
            errors={errors}
          />

          <label>
            Enter the bidding deadline
            <LoginInput
              type='datetime-local'
              name='bid_deadline'
              placeholder=''
              register={register}
              errors={errors}
            />
          </label>

          <textarea
            name='project_description'
            rows='4'
            cols='50'
            placeholder='Enter the description for the project'
            {...register("project_description", {
              required: true,
            })}
          />
          {errors.project_description && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}

          {/* <LoginInput
            type="file"
            name="projectFile"
            placeholder="Add File"
            register={register}
            errors={errors}
          /> */}

          <input
            type='file'
            name='projectFile'
            accept='image/*,.pdf,.doc,.docx'
            {...register("projectFile")}
            // onChange={(e) => {
            //   if (e.target.name === "projectFile") {
            //     setfileUpload(e.target.files[0]);
            //   }
            //   console.log(e.target.files);
            // }}
          />
          {errors.projectFile && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}

          <Controller
            name='skills'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder='Select skills for the project'
                getOptionLabel={(option) => option.skill_name}
                getOptionValue={(option) => option.id}
                options={skillArr}
              />
            )}
            rules={{ required: true }}
          />
          {errors.skills && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}
          <Button type='submit'>Post</Button>
        </div>
        {/* <div className={styles.login__footer}>
          <Button type="submit">Post</Button>
        </div> */}
      </Card>
    </form>
  );
};

export default PostJob;